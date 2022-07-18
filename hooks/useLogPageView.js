import getPageSlug from "utils/getPageSlug";
import { isProd } from "constants";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

const useLogPageView = () => {
  const shouldLogPageView = isProd && typeof window !== "undefined";
  const swrOptions = {
    revalidateIfStaleData: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false
  };
  const { data: ipData } = useSWR(
    shouldLogPageView && "https://api64.ipify.org?format=json",
    fetcher,
    swrOptions
  );
  const ip = ipData?.ip;
  const slug = getPageSlug(useRouter().asPath);
  useSWR(
    () =>
      shouldLogPageView && ip && slug && `/api/log-view?slug=${slug}&ip=${ip}`,
    fetcher,
    swrOptions
  );
};

export default useLogPageView;
