import getDeviceType from "utils/getDeviceType";
import { browserName, detectOS } from "detect-browser";
import { useEffect } from "react";
import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { MIN_PAGE_VIEW_TIME } from "constants/index";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useStoreUserData = () => {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const userData = await fetcher("/api/analytics/get-user-data");
      if (!userData) {
        const {
          ip,
          city,
          region,
          country_name,
          region_code,
          country_code,
          latitude,
          longitude
        } = await fetcher("https://ipapi.co/json");
        const userAgent = navigator.userAgent;
        const os = detectOS(userAgent);
        const browser = browserName(userAgent);
        const device = getDeviceType();
        const flag = getUnicodeFlagIcon(country_code);
        await fetch("/api/analytics/set-user-data", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ip,
            locationLong: `${city}, ${region}, ${country_name}`,
            locationShort: `${city}, ${region_code}, ${country_code}`,
            flag,
            latLong: `${latitude}, ${longitude}`,
            device,
            os,
            browser
          })
        });
      }
    }, MIN_PAGE_VIEW_TIME * 1000);
    return () => clearTimeout(timer);
  }, []);
};

export default useStoreUserData;
