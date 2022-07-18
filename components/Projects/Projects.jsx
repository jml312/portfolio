import ProjectCard from "./ProjectCard";
import {
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiVisualstudiocode,
  SiPrisma,
  SiStrapi,
  SiChakraui,
  SiMongodb,
  SiReact,
  SiSquarespace,
  SiCss3
} from "react-icons/si";
import Sanity from "components/svgs/Sanity";
import Forms from "components/svgs/Forms";
import { m } from "framer-motion";
import { FaGithubAlt } from "react-icons/fa";

function Projects({
  projects,
  projectsRef,
  useTransition,
  prefersReducedMotion
}) {
  const skills = [
    {
      name: "Next.js",
      slug: "nextjs",
      Icon: <SiNextdotjs className={`text-2xl`} />,
      href: "https://nextjs.org/"
    },
    {
      name: "Tailwind CSS",
      slug: "tailwindcss",
      Icon: <SiTailwindcss className={`text-2xl`} />,
      href: "https://tailwindcss.com/"
    },
    {
      name: "Strapi",
      slug: "strapi",
      Icon: <SiStrapi className={`text-2xl`} />,
      href: "https://strapi.io/"
    },
    {
      name: "Prisma",
      slug: "prisma",
      Icon: <SiPrisma className={`text-2xl`} />,
      href: "https://www.prisma.io/"
    },
    {
      name: "Firebase",
      slug: "firebase",
      Icon: <SiFirebase className={`text-2xl`} />,
      href: "https://firebase.google.com/"
    },
    {
      name: "VsCode",
      slug: "vscode",
      Icon: <SiVisualstudiocode className={`text-2xl`} />,
      href: "https://code.visualstudio.com/"
    },
    {
      name: "Chakra UI",
      slug: "chakraui",
      Icon: <SiChakraui className={`text-2xl`} />,
      href: "https://chakra-ui.com/"
    },
    {
      name: "MongoDB",
      slug: "mongodb",
      Icon: <SiMongodb className={`text-2xl`} />,
      href: "https:/www.mongodb.com/"
    },
    {
      name: "React",
      slug: "react",
      Icon: <SiReact className={`text-2xl`} />,
      href: "https://reactjs.org/"
    },
    {
      name: "Sanity",
      slug: "sanity",
      Icon: <Sanity className={`text-2xl`} viewBox="0 0.5 80 80" />,
      href: "https://www.sanity.io/"
    },
    {
      name: "SquareSpace",
      slug: "squarespace",
      Icon: <SiSquarespace className={`text-2xl`} />,
      href: "https://www.squarespace.com/"
    },
    {
      name: "CSS",
      slug: "css",
      Icon: <SiCss3 className={`text-2xl`} />,
      href: "https://www.w3.org/Style/CSS/Overview.en.html"
    },
    {
      name: "Google Forms",
      slug: "googleforms",
      Icon: <Forms className={`text-2xl`} />,
      href: "https://www.google.com/forms/about/"
    }
  ];

  return (
    <section
      ref={projectsRef}
      className={`flex flex-col items-center lg:items-start justify-center max-w-3xl mx-auto mb-16 pt-5 text-left`}
    >
      <m.div
        initial={{ opacity: 0, x: 25 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.3 }
        }}
        viewport={{ once: true }}
        className={"min-w-[21rem] w-[90%] md:w-full text-left"}
      >
        <h1 className="mb-0.5 font-[700] tracking-tight text-4xl md:text-5xl text-dark dark:text-light">
          Code
        </h1>
        <p className="mb-2.5 dark:text-[rgba(255,255,245,0.75)] text-[rgba(28,29,37,0.75)] text-[1.1rem] md:text-[1.2rem]">
          Discover more on{" "}
          <a
            className={
              "hover:underline underline-offset-2 decoration-1 inline-flex justify-center items-center gap-1.5 text-dark dark:text-light"
            }
            href="https://github.com/jml312"
            target="_blank"
            rel="noreferrer"
          >
            GitHub <FaGithubAlt />
          </a>
        </p>
      </m.div>

      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 place-items-center w-full sm:w-[90%] md:w-full gap-4 md:gap-6"
        }
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={i}
            useTransition={useTransition}
            prefersReducedMotion={prefersReducedMotion}
            project={{
              ...project,
              skills: project.tags.map((tag) =>
                skills.find((e) => e.slug === tag.toLowerCase())
              )
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default Projects;
