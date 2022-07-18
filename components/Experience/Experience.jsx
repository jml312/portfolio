import ExperienceCard from "./ExperienceCard";
import { m } from "framer-motion";

function Experience({
  experienceRef,
  experience,
  theme,
  prefersReducedMotion
}) {
  return (
    <section
      ref={experienceRef}
      className={`flex flex-col items-center lg:items-start justify-center max-w-3xl mx-auto mb-16 pt-5`}
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
          Experience
        </h1>
        <p className="mb-2.5 dark:text-[rgba(255,255,245,0.75)] text-[rgba(28,29,37,0.75)] text-[1.1rem] md:text-[1.2rem]">
          My internships and jobs
        </p>
      </m.div>

      <div className={"flex flex-col gap-4 justify-center items-center w-full"}>
        {experience.map(({ company, title, date, link }, i) => (
          <ExperienceCard
            key={i}
            title={title}
            company={company}
            date={date}
            link={link}
            theme={theme}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

export default Experience;
