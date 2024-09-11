import { m } from "framer-motion";

function ProjectCard({
  project: { title, type, description, skills, github, website },
  useTransition,
  prefersReducedMotion
}) {
  return (
    <m.div
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
      style={{
        borderRadius: "0.375rem"
      }}
      viewport={{ once: true }}
      className={`bg-light dark:bg-dark border border-gray-700 dark:border-gray-300 text-dark dark:text-light p-3.5 flex flex-col text-center sm:text-left gap-8 min-h-[10.75rem] relative drop-shadow-lg rounded-md min-w-[21rem] sm:min-w-0 md:max-w-[23.25rem] w-[90%] sm:w-full`}
    >
      <div className={"flex flex-col justify-between h-full gap-1.5"}>
        <span className={"flex justify-between"}>
          <h1 className={"text-[1.18rem] sm:text-[1.3rem] font-[600]"}>
            {title}
          </h1>
          <p
            className={
              "text-[.85rem] dark:text-[rgba(255,255,245,0.8)] text-[rgba(28,29,37,0.8)]"
            }
          >
            {type}
          </p>
        </span>
        <p
          className={`absolute top-[2.6rem] text-[.91rem] text-left dark:text-[rgba(255,255,245,0.85)] text-[rgba(28,29,37,0.85)] mt-[0.1rem]`}
        >
          {description}
        </p>
        <div className={"flex justify-evenly items-center mt-[2.35rem] mb-4"}>
          {skills.map(({ Icon, name, href }) => (
            <a
              key={name}
              href={href}
              aria-label={`Link to "${name}`}
              rel="noreferrer"
              target="_blank"
              className={`flex flex-col justify-center items-center text-center gap-1.5 p-0.5 dark:hover:text-[rgba(255,255,245,0.8)] hover:text-[rgba(28,29,37,0.8)] active:scale-95 ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out"
                  : "transition-none"
              }`}
            >
              {Icon}
              <span className={`text-[.7rem]`}>{name}</span>
            </a>
          ))}
        </div>
        <div
          className={
            "flex flex-row justify-between items-center gap-2.5 mb-0.5"
          }
        >
          {github && (
            <a
              className={`text-[.9rem] md:text-[1rem] rounded-md bg-dark dark:bg-light text-light dark:text-dark active:scale-95 dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(28,29,37,0.8)] py-1.5 flex justify-center items-center gap-1 w-full font-[500] ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out"
                  : "transition-none"
              }`}
              href={github}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          )}
          {website && (
            <a
              className={`text-[.9rem] md:text-[1rem] rounded-md bg-dark dark:bg-light text-light dark:text-dark active:scale-95 dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(28,29,37,0.8)] py-1.5 flex justify-center items-center gap-1.5 w-full font-[500] ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out"
                  : "transition-none"
              }`}
              href={website}
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </m.div>
  );
}

export default ProjectCard;
