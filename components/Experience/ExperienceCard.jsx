import { m } from "framer-motion";
import { BiLinkExternal } from "react-icons/bi";

function ExperienceCard({
  title,
  company,
  date,
  link,
  theme,
  prefersReducedMotion
}) {
  return (
    <m.a
      initial={{ opacity: 0, translateY: "50%" }}
      whileHover={
        !prefersReducedMotion && {
          y: -2,
          transition: {
            duration: 0.1,
            ease: "easeInOut"
          }
        }
      }
      whileInView={{
        opacity: 1,
        translateY: "0%",
        transition: {
          duration: 0.3
        }
      }}
      viewport={{ once: true }}
      href={link}
      target="_blank"
      rel="noreferrer"
      key={title}
      className="min-w-[21rem] w-[90%] md:w-full flex flex-row items-baseline pt-3 pl-3 border border-gray-700 dark:border-gray-300 rounded-md bg-light dark:bg-dark drop-shadow-lg"
    >
      <p className="text-sm dark:text-[rgba(255,255,245,0.6)] text-[rgba(28,29,37,0.6)]">
        {date}
      </p>
      <div className="flex flex-col pl-3 ml-1">
        <h1 className="text-dark dark:text-light w-full text-[1rem] truncate font-[600]">
          {title}
        </h1>
        <p className="mb-4 dark:text-[rgba(255,255,245,0.6)] text-[rgba(28,29,37,0.6)] w-full text-sm truncate">
          {company}
        </p>
      </div>
      <BiLinkExternal className={"absolute right-0 top-0 m-2.5"} />
    </m.a>
  );
}

export default ExperienceCard;
