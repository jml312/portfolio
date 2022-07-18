import { m } from "framer-motion";
import Link from "next/link";

function ArticleCard({
  title,
  slug,
  description,
  tags,
  prefersReducedMotion,
  views,
  isInBlog
}) {
  return (
    <Link href={`/blog/${slug}`} passHref>
      <m.a
        whileHover={
          !prefersReducedMotion && {
            y: -2,
            transition: {
              duration: 0.1,
              ease: "easeInOut"
            }
          }
        }
        initial={!isInBlog && { opacity: 0, translateY: "50%" }}
        whileInView={
          !isInBlog && {
            opacity: 1,
            translateY: "0%",
            transition: {
              duration: 0.3
            }
          }
        }
        viewport={!isInBlog && { once: true }}
        key={title}
        rel="noreferrer"
        className={`min-w-[21rem] ${
          !isInBlog ? "w-[90%]" : "w-full"
        } md:w-full flex flex-col items-start p-3 rounded-md bg-light dark:bg-dark border border-gray-700 dark:border-gray-300 drop-shadow-lg text-left`}
      >
        <div className={"w-full flex justify-between items-start mb-[.2rem]"}>
          <h2
            className={
              "text-lg md:text-xl font-medium text-dark dark:text-light w-full"
            }
          >
            {title}
          </h2>
          <p
            className={
              "w-32 text-right text-[.95rem] dark:text-[rgba(255,255,245,0.75)] text-[rgba(28,29,37,0.75)]"
            }
          >
            {views} view
            {views === 1 ? "" : "s"}
          </p>
        </div>
        <h3
          className={
            "text-[.9rem] md:text-[.95rem] dark:text-[rgba(255,255,245,0.8)] text-[rgba(28,29,37,0.8)] w-full leading-snug"
          }
        >
          {description}
        </h3>

        <div className={"flex flex-wrap gap-1 mt-[.6rem]"}>
          {tags.map((tag) => (
            <span
              className={
                "font-medium text-[.75rem] sm:text-[.8rem] bg-dark dark:bg-light text-light dark:text-dark w-fit py-[.075rem] px-1.5 rounded-md"
              }
              key={tag}
            >
              {tag.toLowerCase()}
            </span>
          ))}
        </div>
      </m.a>
    </Link>
  );
}

export default ArticleCard;
