import { useState, useEffect, useRef } from "react";
import useScrollSpy from "hooks/useScrollSpy";
import useThemeIcon from "hooks/useThemeIcon";
import { m, useAnimation } from "framer-motion";

function Navigation({
  theme,
  setTheme,
  setUseTransition,
  footerRef,
  popupOpen,
  sections,
  useTransition
}) {
  const navRef = useRef();
  const activeSection = useScrollSpy({
    sectionElementRefs: sections.filter(({ ref }) => ref).map(({ ref }) => ref),
    offsetPx: -80
  });
  const ThemeIcon = useThemeIcon(theme);
  const [isColliding, setIsColliding] = useState(false);
  const controls = useAnimation();

  const isOverlapping = () => {
    if (!navRef.current || !footerRef.current) return null;
    return (
      navRef.current.getBoundingClientRect().bottom >=
      footerRef.current.getBoundingClientRect().top
    );
  };

  useEffect(() => {
    if (isOverlapping()) {
      navRef.current.style.opacity = 0;
      navRef.current.style.pointerEvents = "none";
      setIsColliding(true);
    }
    document.addEventListener("scroll", () => setIsColliding(isOverlapping()), {
      passive: true
    });
    return () => {
      document.removeEventListener(
        "scroll",
        () => setIsColliding(isOverlapping()),
        {
          passive: true
        }
      );
    };
  }, []);

  useEffect(() => {
    if (popupOpen) {
      controls.start({
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: 0 }
      });
    } else {
      controls.start({
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
  }, [popupOpen]);

  useEffect(() => {
    if (isColliding) {
      controls.start({
        opacity: 0,
        pointerEvents: "none",
        transition: { duration: 0 }
      });
    } else {
      controls.start({
        opacity: 1,
        pointerEvents: "auto",
        transition: {
          duration: 0
        }
      });
    }
  }, [isColliding]);

  return (
    <m.nav
      animate={controls}
      ref={navRef}
      className={
        "fixed -translate-x-1/2 bottom-[4%] left-1/2 w-max py-3 px-4 rounded-full z-50 flex justify-between items-center gap-3 sm:gap-5 lg:gap-6 bg-[rgba(28,29,37,0.5)] dark:bg-[rgba(255,255,245,0.5)] text-light dark:text-dark backdrop-blur-lg"
      }
    >
      {sections.map(({ name, Icon, onClick }, i) => (
        <button
          key={name}
          aria-label={name}
          onClick={onClick}
          className={`text-[1.0625rem] sm:text-lg rounded-full p-2 cursor-pointer active:scale-95 ${
            activeSection == i
              ? "bg-light text-dark dark:bg-dark dark:text-light"
              : "hover:bg-[rgba(28,29,37,0.3)] hover:dark:bg-[rgba(255,255,245,0.3)] text-light dark:text-dark"
          } ${
            useTransition
              ? "transition-all duration-[250ms] ease-in-out"
              : "transition-none"
          }`}
        >
          <Icon />
        </button>
      ))}
      <span
        className={
          "h-4 sm:h-[1.15rem] w-[1px] bg-light dark:bg-dark rounded-full -mx-1 sm:-mx-3"
        }
      ></span>
      <button
        aria-label="Toggle theme"
        onClick={() => {
          setUseTransition(false);
          setTheme(theme === "light" ? "dark" : "light");
          setTimeout(() => setUseTransition(true), 0);
        }}
        className={`text-[1.0625rem] sm:text-lg cursor-pointer active:scale-95 p-2 hover:bg-[rgba(28,29,37,0.3)] hover:dark:bg-[rgba(255,255,245,0.3)] text-light dark:text-dark rounded-full ${
          useTransition
            ? "transition-all duration-[250ms] ease-in-out"
            : "transition-none"
        }`}
      >
        {ThemeIcon}
      </button>
    </m.nav>
  );
}

export default Navigation;
