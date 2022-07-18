import "styles/globals.css";
import "@fontsource/ibm-plex-sans/300.css";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import { polyfill } from "smoothscroll-polyfill";
import { LazyMotion, MotionConfig } from "framer-motion";
import getPageSlug from "utils/getPageSlug";
import { isProd } from "constants";
import { useRouter } from "next/router";
import useSWR from "swr";

const framerMotionFeatures = () =>
  import("framerMotionFeatures").then((res) => res.default);

const fetcher = (url) => fetch(url).then((r) => r.json());

function App({ Component, pageProps }) {
  useEffect(() => polyfill(), []);

  const { asPath } = useRouter();
  useSWR(
    isProd && typeof window !== "undefined"
      ? `/api/log-view?slug=${getPageSlug(asPath)}`
      : null,
    fetcher,
    {
      revalidateIfStaleData: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false
    }
  );

  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange={true}
      defaultTheme="dark"
      enableSystem={false}
    >
      <LazyMotion features={framerMotionFeatures} strict>
        <MotionConfig reducedMotion="user">
          <Component {...pageProps} />
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}

export default App;
