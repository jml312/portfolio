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
import useLogPageView from "hooks/useLogPageView";
import { useRouter } from "next/router";
import getPageSlug from "utils/getPageSlug";

function App({ Component, pageProps }) {
  useEffect(() => polyfill(), []);
  useLogPageView(getPageSlug(useRouter().asPath));

  return (
    <ThemeProvider
      attribute="class"
      disableTransitionOnChange={true}
      defaultTheme="dark"
      enableSystem={false}
    >
      <LazyMotion
        features={() =>
          import("framerMotionFeatures").then(
            ({ default: features }) => features
          )
        }
        strict
      >
        <MotionConfig reducedMotion="user">
          <Component {...pageProps} />
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}

export default App;
