import { m } from "framer-motion";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiVisualstudiocode,
  SiPrisma
} from "react-icons/si";
import Sanity from "components/svgs/Sanity";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

function About({ isBig, HCaptchaLoading, bio, links, prefersReducedMotion }) {
  const iconClasses = "text-3xl sm:text-[1.9rem] lg:text-[2.1rem]";
  const skills = [
    {
      name: "Next.js",
      Icon: <SiNextdotjs className={iconClasses} />,
      href: "https://nextjs.org/"
    },
    {
      name: "Tailwind",
      Icon: <SiTailwindcss className={iconClasses} />,
      href: "https://tailwindcss.com/"
    },
    {
      name: "Sanity",
      Icon: <Sanity className={iconClasses} viewBox="0 1.5 80 80" />,
      href: "https://www.sanity.io/"
    },
    {
      name: "Prisma",
      Icon: <SiPrisma className={iconClasses} />,
      href: "https://www.prisma.io/"
    },
    {
      name: "Firebase",
      Icon: <SiFirebase className={iconClasses} />,
      href: "https://firebase.google.com/"
    },
    {
      name: "VsCode",
      Icon: <SiVisualstudiocode className={iconClasses} />,
      href: "https://code.visualstudio.com/"
    }
  ];
  const nameVariants = {
    rest: {
      opacity: 0,
      translateY: "-100%"
    },
    hover: {
      opacity: 1,
      translateY: "0%"
    }
  };
  return (
    <m.div
      initial={
        !prefersReducedMotion
          ? isBig
            ? {
                translateX: "-150%"
              }
            : {
                translateX: "0%"
              }
          : { opacity: 0 }
      }
      animate={
        !prefersReducedMotion
          ? isBig
            ? {
                translateX: "-50%"
              }
            : {
                translateX: "0%"
              }
          : { opacity: 1 }
      }
      exit={
        !prefersReducedMotion
          ? isBig
            ? {
                translateX: "-200%",
                opacity: 0,
                transition: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }
            : {
                translateX: "0%",
                opacity: 1,
                transition: {
                  duration: 0,
                  ease: "backInOut"
                }
              }
          : {
              opacity: 0
            }
      }
      transition={{
        duration: 0.2,
        ease: "easeInOut"
      }}
      className={`big:absolute w-full big:w-5/6 lg:w-3/4 h-full bg-light flex flex-col justify-center items-center text-dark dark:z-50 z-auto big:rounded-l-md big:border-[0.5px] big:border-dark big:dark:border-[0.5px] big:dark:border-light ${
        HCaptchaLoading ? "opacity-50" : "opacity-100"
      } ${prefersReducedMotion && "-translate-x-1/2"}`}
    >
      <div
        className={
          "flex flex-col justify-center items-center big:grid big:grid-rows-3 big:grid-cols-1 big:justify-items-center h-full big:h-[70%] w-3/4 mt-10 big:mt-0"
        }
      >
        <div className={"flex justify-between items-center w-full self-start"}>
          <div className={"flex flex-col justify-center items-start gap-1.5"}>
            <h1 className={"font-bold text-3xl lg:text-4xl"}>About Me.</h1>
            <h4 className={"text-sm lg:text-[.95rem]"}>Full Stack Developer</h4>
          </div>

          <div
            className={
              "flex justify-center items-center self-start translate-y-1 -translate-x-2 gap-2 lg:gap-[.6rem]"
            }
          >
            {links.map(({ name, href, Icon, isExternal }) =>
              isExternal ? (
                <a
                  key={name}
                  href={href}
                  title={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    "active:scale-95 transition-all ease-in-out duration-[250ms] hover:text-[rgba(28,29,37,0.8)] dark:hover:text-[rgba(28,29,37,0.8)] text-[1.2rem] sm:text-[1.25rem] md:text-[1.275rem] lg:text-[1.3rem]"
                  }
                >
                  <Icon />
                </a>
              ) : (
                <Link href={href} key={name}>
                  <a
                    title={name}
                    className={
                      "active:scale-95 transition-all ease-in-out duration-[250ms] hover:text-[rgba(28,29,37,0.8)] dark:hover:text-[rgba(28,29,37,0.8)] text-[1.25rem] sm:text-[1.275rem] md:text-[1.3rem] lg:text-[1.35rem]"
                    }
                  >
                    <Icon />
                  </a>
                </Link>
              )
            )}
          </div>
        </div>

        <div
          className={
            "flex flex-col justify-center items-center gap-12 self-start big:-translate-y-[4.65rem] mt-10 big:mt-0 mb-14 big:mb-0 w-full row-span-2"
          }
        >
          <p
            className={
              "text-[.95rem] sm:text-[1rem] leading-[1.7] inline-block"
            }
          >
            <PortableText
              value={bio}
              components={{
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold">{children}</strong>
                  ),
                  link: ({ value, children }) => (
                    <a
                      href={value?.href}
                      target={"_blank"}
                      rel={"noopener noreferrer"}
                      className={"hover:underline"}
                    >
                      {children}
                    </a>
                  )
                }
              }}
            />
          </p>
          <div
            className={
              "grid grid-cols-3 grid-rows-1 w-[72.5%] big:w-3/4 gap-9 self-center -mt-1.5 big:-mt-1"
            }
          >
            {skills.map(({ Icon, name, href }) => (
              <m.a
                key={name}
                href={href}
                rel="noreferrer"
                target="_blank"
                className={
                  "flex flex-col justify-center items-center text-center gap-1.5 transition-all ease-in-out duration-[250ms] active:scale-95"
                }
                initial={isBig && !prefersReducedMotion ? "rest" : "hover"}
                animate={isBig && !prefersReducedMotion ? "rest" : "hover"}
                whileHover="hover"
              >
                {Icon}
                <m.p
                  className={
                    "text-[.8rem] sm:text-[.9rem] lg:text-[.925rem] italic"
                  }
                  variants={nameVariants}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut"
                  }}
                >
                  {name}
                </m.p>
              </m.a>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}

export default About;
