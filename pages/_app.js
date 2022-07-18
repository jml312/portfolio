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

const framerMotionFeatures = () =>
  import("framerMotionFeatures").then((res) => res.default);

function App({ Component, pageProps }) {
  useEffect(() => polyfill(), []);
  useLogPageView();

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
