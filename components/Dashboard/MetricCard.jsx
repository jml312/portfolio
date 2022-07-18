import { m } from "framer-motion";
import { BiLinkExternal } from "react-icons/bi";

function MetricCard({
  header,
  link,
  metric,
  isDisabled,
  prefersReducedMotion
}) {
  return (
    <m.a
      initial={{ opacity: 0, translateY: "50%" }}
      whileHover={
        !isDisabled &&
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
      target="_blank"
      rel="noopener noreferrer"
      href={isDisabled ? undefined : link}
      className={`min-w-[21rem] sm:min-w-0 md:max-w-[23.25rem] w-[90%] sm:w-full p-4 rounded-md bg-light dark:bg-dark border border-gray-700 dark:border-gray-300 ${
        isDisabled ? "cursor-auto" : "cursor-pointer"
      }`}
    >
      <h1 className="flex items-center drop-shadow-lg dark:text-[rgba(255,255,245,0.8)] text-[rgba(28,29,37,0.8)] text-[.9rem]">
        {header}
      </h1>
      <p className="mt-2 text-[1.2rem] text-dark dark:text-light font-[600]">
        {metric}
      </p>
      {!isDisabled && (
        <BiLinkExternal className={"absolute right-0 top-0 m-2.5"} />
      )}
    </m.a>
  );
}

export default MetricCard;
