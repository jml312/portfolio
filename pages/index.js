import client from "lib/sanity.mjs";
import Navigation from "components/Navigation";
import Home from "components/Home";
import Projects from "components/Projects";
import Experience from "components/Experience";
import Articles from "components/Articles";
import Dashboard from "components/Dashboard";
import Footer from "components/Footer";
import { useTheme } from "next-themes";
import { AiOutlineHome } from "react-icons/ai";
import { HiMail, HiOutlineCode } from "react-icons/hi";
import { FaLinkedinIn, FaGithubAlt } from "react-icons/fa";
import About from "components/Popup/About";
import Contact from "components/Popup/Contact/Contact";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import useMediaQuery from "hooks/useMediaQuery";
import ClickAwayListener from "react-click-away-listener";
import { RiMailSendLine } from "react-icons/ri";
import waitForScrollEnd from "utils/waitForScrollEnd";
import { MdOutlineDashboard, MdWorkOutline } from "react-icons/md";
import { GoBook } from "react-icons/go";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdClose } from "react-icons/io";
import { getTopTracks, getWakaTimeStats } from "utils/metrics";
import { BASE_URL, MANAGE_URL } from "constants/index.mjs";
import StripeLoader from "components/StripeLoader";
import { NextSeo } from "next-seo";
import { IndexSEO } from "seo";
import { indexPageQuery } from "lib/queries.mjs";
import { TbDeviceAnalytics } from "react-icons/tb";

export default function HomePage({
  blogPosts,
  bio,
  projects,
  experience,
  resume,
  shortTermTracks,
  longTermTracks,
  wakaTime,
  totalViews
}) {
  const homeRef = useRef();
  const projectsRef = useRef();
  const experienceRef = useRef();
  const articleRef = useRef();
  const dashboardRef = useRef();
  const footerRef = useRef();
  const [popupOpen, setPopupOpen] = useState(false);
  const [useTransition, setUseTransition] = useState(true);
  const [HCaptchaLoading, setHCaptchaLoading] = useState(false);
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const router = useRouter();
  const { payment } = router.query;
  const { theme, setTheme } = useTheme();
  const isBig = useMediaQuery("(min-width: 850px)");

  const sections = [
    {
      name: "Home",
      Icon: AiOutlineHome,
      ref: homeRef,
      onClick: () =>
        homeRef.current.scrollIntoView({
          behavior: "smooth"
        })
    },
    {
      name: "Projects",
      Icon: HiOutlineCode,
      ref: projectsRef,
      onClick: () =>
        projectsRef.current.scrollIntoView({
          behavior: "smooth"
        })
    },
    {
      name: "Experience",
      Icon: MdWorkOutline,
      ref: experienceRef,
      onClick: () =>
        experienceRef.current.scrollIntoView({
          behavior: "smooth"
        })
    },
    {
      name: "Articles",
      Icon: GoBook,
      ref: articleRef,
      onClick: () =>
        articleRef.current.scrollIntoView({
          behavior: "smooth"
        })
    },
    {
      name: "Dashboard",
      Icon: MdOutlineDashboard,
      ref: dashboardRef,
      onClick: () =>
        dashboardRef.current.scrollIntoView({
          behavior: "smooth"
        })
    },
    {
      name: "Contact",
      Icon: RiMailSendLine,
      onClick: async () => {
        homeRef.current.scrollIntoView({
          behavior: "smooth"
        });
        await waitForScrollEnd();
        if (window.scrollY == 0) {
          setPopupOpen(true);
        }
      }
    }
  ];
  const links = [
    {
      name: "Email",
      href: "mailto:joshlevy.texas@gmail.com",
      Icon: HiMail,
      isExternal: true
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/jml312",
      Icon: FaLinkedinIn,
      isExternal: true
    },
    {
      name: "GitHub",
      href: "https://github.com/jml312",
      Icon: FaGithubAlt,
      isExternal: true
    },
    {
      name: "Blog",
      href: "/blog",
      Icon: GoBook,
      isExternal: false
    }
  ];

  useEffect(() => {
    if (payment === "success") {
      toast.success("Payment Successful!");
      window.history.replaceState(null, "", BASE_URL);
    } else if (payment === "cancel") {
      toast.info("Payment Cancelled");
      window.history.replaceState(null, "", BASE_URL);
    }
  }, [payment]);

  if (isStripeLoading) return <StripeLoader />;

  return (
    <>
      <NextSeo {...IndexSEO} />
      <main ref={homeRef} className={"overflow-x-hidden"}>
        <ToastContainer
          position="bottom-left"
          theme={theme === "light" ? "dark" : "light"}
          toastClassName="bg-dark text-light dark:bg-light dark:text-dark"
          limit={1}
          closeOnClick={true}
          closeButton={
            <IoMdClose
              className={`dark:fill-dark fill-light hover:fill-[rgba(255,255,245,0.8)] dark:hover:fill-[rgba(28,29,37,0.8)] scale-110 ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out"
                  : "transition-none"
              }`}
            />
          }
        />
        <Navigation
          sections={sections}
          popupOpen={popupOpen}
          links={links}
          theme={theme}
          setTheme={setTheme}
          setUseTransition={setUseTransition}
          footerRef={footerRef}
          useTransition={useTransition}
        />
        <AnimatePresence>
          {popupOpen && (
            <ClickAwayListener
              onClickAway={() =>
                isBig && !HCaptchaLoading && setPopupOpen(false)
              }
            >
              <m.div
                initial={
                  !isBig &&
                  (!prefersReducedMotion
                    ? {
                        translateX: "-200%"
                      }
                    : {
                        opacity: 0
                      })
                }
                animate={
                  !isBig &&
                  (!prefersReducedMotion
                    ? {
                        translateX: "0%"
                      }
                    : {
                        opacity: 1
                      })
                }
                exit={
                  !isBig &&
                  (!prefersReducedMotion
                    ? {
                        translateX: "-200%",
                        transition: {
                          duration: 0.2,
                          ease: "easeInOut"
                        }
                      }
                    : {
                        opacity: 0
                      })
                }
                transition={{
                  duration: 0.2,
                  ease: "easeInOut"
                }}
                className={`min-h-screen big:min-h-0 flex flex-col-reverse justify-center items-center big:fixed big:top-1/2 big:left-1/2 big:-translate-x-1/2 big:-translate-y-1/2 big:h-[90%] big:w-[45vw] big:min-w-[50%] big:max-w-[50%] bg-transparent`}
              >
                <About
                  isBig={isBig}
                  HCaptchaLoading={HCaptchaLoading}
                  bio={bio}
                  links={links.slice(0, 3)}
                  prefersReducedMotion={prefersReducedMotion}
                />
                <Contact
                  isBig={isBig}
                  setPopupOpen={setPopupOpen}
                  HCaptchaLoading={HCaptchaLoading}
                  setHCaptchaLoading={setHCaptchaLoading}
                  prefersReducedMotion={prefersReducedMotion}
                />
              </m.div>
            </ClickAwayListener>
          )}
        </AnimatePresence>
        <div
          className={`${
            useTransition
              ? "transition-all duration-[250ms] ease-in-out"
              : "transition-none"
          } ${
            popupOpen
              ? "pointer-events-none hidden transition-none"
              : "pointer-events-auto inline transition-all ease-in-out"
          }`}
        >
          <Home
            links={links}
            theme={theme}
            setTheme={setTheme}
            homeRef={homeRef}
            articleRef={articleRef}
            setPopupOpen={setPopupOpen}
            resume={resume}
            footerRef={footerRef}
            popupOpen={popupOpen}
            useTransition={useTransition}
          />
          <Projects
            projects={projects}
            projectsRef={projectsRef}
            isBig={isBig}
            useTransition={useTransition}
            prefersReducedMotion={prefersReducedMotion}
          />
          <Experience
            experienceRef={experienceRef}
            experience={experience}
            theme={theme}
            prefersReducedMotion={prefersReducedMotion}
          />
          <Articles
            articleRef={articleRef}
            blogPosts={blogPosts}
            prefersReducedMotion={prefersReducedMotion}
          />
          <Dashboard
            dashboardRef={dashboardRef}
            shortTermTracks={shortTermTracks}
            longTermTracks={longTermTracks}
            languages={wakaTime.languages}
            project={wakaTime.project}
            codingTime={wakaTime.total_seconds}
            totalViews={totalViews}
            useTransition={useTransition}
            prefersReducedMotion={prefersReducedMotion}
          />
          <div
            className={"w-full flex flex-col justify-center items-center my-16"}
          >
            <m.button
              initial={{ scale: 1.25, opacity: 0 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.25
                }
              }}
              viewport={{ once: true }}
              onClick={sections[sections.length - 1].onClick}
              className={`px-7 py-4 text-lg sm:text-[1.2rem] rounded-md bg-dark dark:bg-light text-light dark:text-dark active:scale-95 dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(28,29,37,0.8)] font-[600] ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out"
                  : "transition-none"
              }`}
            >
              Let's Talk
            </m.button>
          </div>
          <Footer
            footerRef={footerRef}
            links={[
              ...links,
              {
                name: "Analytics",
                href: MANAGE_URL,
                Icon: TbDeviceAnalytics,
                isExternal: true
              }
            ]}
            isStripeLoading={isStripeLoading}
            setIsStripeLoading={setIsStripeLoading}
            useTransition={useTransition}
            marginTop={"mt-16"}
          />
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const fetchSanity = async () => await client.fetch(indexPageQuery);
  const [sanity, wakaTime, { shortTermTracks, longTermTracks }] =
    await Promise.all([fetchSanity(), getWakaTimeStats(), getTopTracks()]);
  return {
    props: {
      ...sanity,
      shortTermTracks,
      longTermTracks,
      wakaTime,
      totalViews: sanity.blogPosts.reduce(
        (acc, curr) => acc + Number(curr.views),
        0
      )
    }
  };
}
