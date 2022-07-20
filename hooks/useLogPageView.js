import { isProd } from "constants";
import useSWR from "swr";
import getDeviceType from "utils/getDeviceType";
import { browserName, detectOS } from "detect-browser";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useLogPageView = (slug) => {
  const shouldLogPageView = isProd && typeof window !== "undefined";
  const swrOptions = {
    revalidateIfStaleData: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false
  };
  const { data: locationData } = useSWR(
    shouldLogPageView && "https://ipapi.co/json",
    fetcher,
    swrOptions
  );
  let logViewUrl;
  if (locationData) {
    const userAgent = navigator.userAgent;
    const os = detectOS(userAgent);
    const browser = browserName(userAgent);
    const referrer = document.referrer || "None";
    const device = getDeviceType();
    const date = new Date().toISOString();
    const {
      ip,
      city,
      region,
      country_name,
      region_code,
      country_code,
      latitude,
      longitude
    } = locationData;
    logViewUrl = `/api/log-view?slug=${slug}&ip=${ip}&referrer=${referrer}&date=${date}&device=${device}&os=${os}&browser=${browser}&city=${city}&region=${region}&country_name=${country_name}&region_code=${region_code}&country_code=${country_code}&latitude=${latitude}&longitude=${longitude}`;
  }
  useSWR(() => shouldLogPageView && logViewUrl, fetcher, swrOptions);
};

export default useLogPageView;
