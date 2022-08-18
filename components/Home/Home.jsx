import waitForScrollEnd from "utils/waitForScrollEnd";
import { useEffect } from "react";
import { m, useAnimation } from "framer-motion";
import Spinner from "components/ThreeJ/Spinner";
import dynamic from "next/dynamic";
import Link from "next/link";

const ThreeJ = dynamic(() => import("components/ThreeJ"), {
  ssr: false,
  loading: () => <Spinner isHomeScreen />
});

function Home({
  homeRef,
  theme,
  setPopupOpen,
  links,
  footerRef,
  popupOpen,
  useTransition
}) {
  const sectionControls = useAnimation();

  useEffect(() => {
    if (popupOpen) {
      sectionControls.start({
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: 0 }
      });
    } else {
      sectionControls.start({
        opacity: 1,
        pointerEvents: "auto",
        transition: {
          duration: 0.1,
          delay: 0.2,
          ease: "backIn",
          type: "tween"
        }
      });
    }
  }, [popupOpen, sectionControls]);

  return (
    <m.section
      animate={sectionControls}
      ref={homeRef}
      className={`flex flex-col justify-center items-center min-w-screen h-screen text-dark dark:text-light mb-6`}
    >
      <div
        className={
          "w-full min-w-[48.5rem] max-w-[48.5rem] bg-red-5000 h-[92.5%] flex flex-col justify-between items-center"
        }
      >
        <div
          className={
            "flex flex-col justify-center items-center gap-[1.125rem] translate-y-4"
          }
        >
          <div className={"flex flex-col justify-center items-center"}>
            <p className={"text-lg opacity-90"}>Hello, I'm</p>
            <h1 className={"text-[2.8rem] font-[600]"}>Josh Levy</h1>
            <p className={"text-lg opacity-80"}>Fullstack Developer</p>
          </div>

          <div
            className={
              "flex gap-0 divide-x dark:divide-light divide-dark dark:hover:divide-transparent hover:divide-transparent"
            }
          >
            <a
              href={"/assets/Josh%20Levy%20Resume.pdf"}
              target="_blank"
              rel="noreferrer"
              className={`dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(28,29,37,0.8)] hover:text-light dark:hover:text-dark border-[1.5px] border-dark dark:border-light hover:border-transparent dark:hover:border-transparent rounded-l-md px-3 py-2.5 font-[600] ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out active:scale-95"
                  : "transition-none"
              }`}
            >
              Resume
            </a>
            <button
              className={`px-3.5 py-[.65rem] rounded-r-md bg-dark dark:bg-light text-light dark:text-dark dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(28,29,37,0.8)] font-[600] ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out active:scale-95"
                  : "transition-none"
              }`}
              onClick={async () => {
                homeRef.current.scrollIntoView({
                  behavior: "smooth"
                });
                await waitForScrollEnd();
                if (window.scrollY == 0) {
                  setPopupOpen(true);
                }
              }}
            >
              Let's Talk
            </button>
          </div>
        </div>
        <div className={"h-2/5 w-[26.5vh] translate-y-3.5"}>
          <ThreeJ theme={theme} />
        </div>
        <div
          className={
            "flex justify-between items-center w-full h-[3.75rem] overflow-visible"
          }
        >
          <div
            className={
              "hidden md:flex flex-col items-center justify-center gap-3.5 self-end translate-x-0.5"
            }
          >
            {links.map(({ name, href, Icon, isExternal }) =>
              isExternal ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  key={name}
                  title={name}
                  className={`flex justify-center items-center gap-1 dark:hover:text-[rgba(255,255,245,0.8)] hover:text-[rgba(28,29,37,0.8)] active:scale-95 ${
                    useTransition
                      ? "transition-all duration-[250ms] ease-in-out"
                      : "transition-none"
                  }`}
                >
                  <Icon className={"text-[1.15rem]"} />
                </a>
              ) : (
                <Link href={href} key={name}>
                  <a
                    title={name}
                    className={`flex justify-center items-center gap-1 dark:hover:text-[rgba(255,255,245,0.8)] hover:text-[rgba(28,29,37,0.8)] active:scale-95 ${
                      useTransition
                        ? "transition-all duration-[250ms] ease-in-out"
                        : "transition-none"
                    }`}
                  >
                    <Icon className={"text-[1.15rem]"} />
                  </a>
                </Link>
              )
            )}
            <span
              className={"rounded-full bg-dark dark:bg-light w-[0.1rem] h-7"}
            ></span>
          </div>
          <button
            onClick={() =>
              footerRef.current.scrollIntoView({ behavior: "smooth" })
            }
            className={`hidden md:inline origin-bottom-right rotate-90 dark:hover:text-[rgba(255,255,245,0.8)] hover:text-[rgba(28,29,37,0.8)] cursor-pointer text-sm opacity-90 self-end -translate-x-5 ${
              useTransition
                ? "transition-all duration-[250ms] ease-in-out"
                : "transition-none"
            }`}
          >
            Scroll Down
          </button>
        </div>
      </div>
    </m.section>
  );
}

export default Home;
