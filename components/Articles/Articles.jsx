import ArticleCard from "./ArticleCard";
import { m } from "framer-motion";
import Link from "next/link";
import { GoBook } from "react-icons/go";

function Articles({ articleRef, blogPosts, prefersReducedMotion }) {
  return (
    <section
      className={`flex flex-col items-center lg:items-start justify-center max-w-3xl mx-auto mb-16 pt-5`}
      ref={articleRef}
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
        <h1 className="mb-0.5 font-[700] tracking-tight text-dark text-4xl md:text-5xl dark:text-light">
          Articles
        </h1>
        <p className="mb-2.5 dark:text-[rgba(255,255,245,0.75)] text-[rgba(28,29,37,0.75)] text-[1.1rem] md:text-[1.2rem]">
          Featured in my{" "}
          <Link href={`/blog`} passHref>
            <a
              className={
                "hover:underline underline-offset-2 decoration-1 inline-flex justify-center items-center gap-1.5 text-dark dark:text-light ml-0.5"
              }
            >
              Blog <GoBook />
            </a>
          </Link>
        </p>
      </m.div>

      <div className={"flex flex-col gap-4 justify-center items-center w-full"}>
        {blogPosts.map(({ title, slug, description, tags, views }) => (
          <ArticleCard
            key={title}
            title={title}
            slug={slug}
            tags={tags}
            description={description}
            views={views}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    </section>
  );
}

export default Articles;
