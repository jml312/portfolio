import { m } from "framer-motion";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";
import useThemeIcon from "hooks/useThemeIcon";

function BlogNav({
  theme,
  setTheme,
  links,
  useTransition,
  setUseTransition,
  router
}) {
  const ThemeIcon = useThemeIcon(theme);
  return (
    <m.nav
      key={router?.asPath}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className={"flex justify-between items-center w-full"}
    >
      <Link href="/">
        <a
          title="Home"
          className={`text-[1.3rem] sm:text-[1.35rem] active:scale-95 dark:hover:text-[rgba(255,255,245,0.8)] hover:text-[rgba(28,29,37,0.8)] text-dark dark:text-light ${
            useTransition
              ? "transition-all ease-in-out duration-[250ms]"
              : "transition-none"
          }`}
        >
          <AiOutlineHome />
        </a>
      </Link>
      <div className={"flex justify-center items-center gap-[.85rem]"}>
        {links.map(({ name, href, Icon, isExternal }) =>
          isExternal ? (
            <a
              title={name}
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[1.3rem] sm:text-[1.35rem] active:scale-95 dark:hover:text-[rgba(255,255,245,0.8)] hover:text-[rgba(28,29,37,0.8)] text-dark dark:text-light ${
                useTransition
                  ? "transition-all ease-in-out duration-[250ms]"
                  : "transition-none"
              }`}
            >
              <Icon />
            </a>
          ) : (
            <Link href={href} key={name}>
              <a
                title={name}
                className={`text-[1.3rem] sm:text-[1.35rem] active:scale-95 dark:hover:text-[rgba(255,255,245,0.8)] hover:text-[rgba(28,29,37,0.8)] text-dark dark:text-light ${
                  useTransition
                    ? "transition-all ease-in-out duration-[250ms]"
                    : "transition-none"
                }`}
              >
                <Icon />
              </a>
            </Link>
          )
        )}
      </div>
      <button
        title="Toggle Theme"
        className={`text-[1.3rem] sm:text-[1.35rem] active:scale-95 dark:hover:text-[rgba(255,255,245,0.8)] hover:text-[rgba(28,29,37,0.8)] text-dark dark:text-light ${
          useTransition
            ? "transition-all ease-in-out duration-[250ms]"
            : "transition-none"
        }`}
        onClick={() => {
          setUseTransition(false);
          setTheme(theme === "light" ? "dark" : "light");
          setTimeout(() => setUseTransition(true), 0);
        }}
      >
        {ThemeIcon}
      </button>
    </m.nav>
  );
}

export default BlogNav;
