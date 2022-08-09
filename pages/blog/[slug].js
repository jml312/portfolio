import { NextSeo } from "next-seo";
import { ArticleSEO } from "seo";
import { LIVE } from "constants/index.mjs";
import client from "lib/sanity.mjs";
import { PortableText } from "@portabletext/react";
import readingTime from "reading-time";
import { useState, useRef } from "react";
import blockContentToPlainText from "utils/blockContentToPlainText";
import { useRouter } from "next/router";
import { GoBook } from "react-icons/go";
import Footer from "components/Footer";
import { AiOutlineHome } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";
import { HiMail } from "react-icons/hi";
import { FaLinkedinIn, FaGithubAlt } from "react-icons/fa";
import Link from "next/link";
import StripeLoader from "components/StripeLoader";
import ArticleCard from "components/Articles/ArticleCard";
import { CopyBlock, atomOneDark, atomOneLight } from "react-code-blocks";
import BlogNav from "components/BlogNav";
import Image from "next/future/image";
import { articlePageQuery, blogSlugsQuery } from "lib/queries.mjs";
import { MdAutoGraph } from "react-icons/md";

export default function Article({
  currentPost,
  relatedPosts,
  hasRelatedPosts
}) {
  const { slug, post, tags, published, title, description, views } =
    currentPost;
  const footerRef = useRef();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [useTransition, setUseTransition] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const links = [
    {
      name: "Email",
      href: "mailto:me@joshlevy.io",
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
    }
  ];

  if (isStripeLoading) return <StripeLoader />;

  const blogTitle = `${title} – Josh Levy`;
  const SEO = {
    ...ArticleSEO,
    title: blogTitle,
    description: description,
    canonical: `${LIVE}/blog/${slug}`,
    openGraph: {
      ...ArticleSEO.openGraph,
      title: blogTitle,
      description,
      url: `${LIVE}/blog/${slug}`,
      tags: [...tags, ...ArticleSEO.openGraph.tags],
      type: "article",
      article: {
        publishedTime: published,
        tags
      }
    }
  };
  return (
    <>
      <NextSeo {...SEO} />
      <main
        className={
          "flex flex-col justify-center items-center text-center mt-10 gap-2 mx-auto min-w-[21rem] max-w-3xl px-4"
        }
      >
        <BlogNav
          theme={theme}
          setTheme={setTheme}
          links={[
            ...links,
            {
              name: "Blog",
              href: "/blog",
              Icon: GoBook,
              isExternal: false
            }
          ]}
          router={router}
          useTransition={useTransition}
          setUseTransition={setUseTransition}
        />
        <div
          className={
            "flex flex-col justify-center items-start gap-1 mt-10 mb-4 text-left w-full"
          }
        >
          <h1
            className={
              "font-bold tracking-tight text-dark text-[2rem] sm:text-4xl md:text-[2.75rem] dark:text-light w-full leading-[1.125] sm:leading-[1.125] md:leading-[1.125] mb-[.2rem]"
            }
          >
            {title}
          </h1>
          <div className={"w-full flex justify-between items-center"}>
            <p
              className={
                "text-[.875rem] sm:text-[.9rem] dark:text-[rgba(255,255,245,0.9)] text-[rgba(28,29,37,0.8)]"
              }
            >
              Josh Levy &nbsp;/&nbsp;
              {new Date(published).toLocaleDateString("en-us", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </p>
            <p
              className={
                "text-[.875rem] sm:text-[.9rem] dark:text-[rgba(255,255,245,0.9)] text-[rgba(28,29,37,0.8)]"
              }
            >
              {readingTime(blockContentToPlainText(post)).text}&nbsp;•&nbsp;
              {views} view
              {views === 1 ? "" : "s"}
            </p>
          </div>
          <div className={"flex justify-center items-center gap-1 mt-1.5"}>
            {tags.map((tag) => (
              <span
                key={tag}
                className={
                  "font-medium text-[.75rem] sm:text-[.8rem] bg-dark dark:bg-light text-light dark:text-dark w-fit py-[.1rem] px-[0.3125rem] rounded-md"
                }
              >
                {tag.toLowerCase()}
              </span>
            ))}
          </div>
        </div>

        <article
          className={
            "text-left prose sm:prose-lg md:prose-xl dark:prose-dark my-3"
          }
        >
          <PortableText
            value={post}
            components={{
              types: {
                imageSection: ({ value: { imageUrl, alt } }) => {
                  return (
                    <div className={"w-full flex justify-center items-center"}>
                      <Image
                        src={imageUrl}
                        alt={alt}
                        width={200}
                        height={200}
                        className={"rounded-md w-3/4"}
                        priority
                      />
                    </div>
                  );
                },
                codeBlock: ({ value }) => (
                  <CopyBlock
                    text={value.code.code}
                    language={value.code.language}
                    theme={theme === "light" ? atomOneDark : atomOneLight}
                    codeBlock
                  />
                )
              }
            }}
          />
        </article>

        {relatedPosts.length > 0 && (
          <div className="w-full">
            <h2
              className={
                "text-[1.6rem] md:text-[1.7rem] lg:text-3xl font-semibold mt-0.5"
              }
            >
              {hasRelatedPosts ? "Related" : "More"} Articles
            </h2>
            <div
              className={
                "flex flex-col justify-center items-center w-full gap-6 mt-4"
              }
            >
              {relatedPosts.map((article) => (
                <ArticleCard
                  key={article.title}
                  title={article.title}
                  slug={article.slug}
                  tags={article.tags}
                  published={article.published}
                  post={article.post}
                  description={article.description}
                  views={article.views}
                  prefersReducedMotion={prefersReducedMotion}
                  isInBlog
                />
              ))}
            </div>
          </div>
        )}

        <div
          className={`w-full flex flex-col justify-center items-center ${
            relatedPosts.length ? "mt-14" : "mt-[1.15rem]"
          }`}
        >
          <Link href={`/blog`} passHref>
            <a
              className={`px-7 py-4 text-lg sm:text-[1.2rem] rounded-md bg-dark dark:bg-light text-light dark:text-dark active:scale-95 dark:hover:bg-[rgba(255,255,245,0.8)] hover:bg-[rgba(28,29,37,0.8)] font-[600] ${
                useTransition
                  ? "transition-all duration-[250ms] ease-in-out"
                  : "transition-none"
              }`}
            >
              All Articles
            </a>
          </Link>
        </div>

        <Footer
          footerRef={footerRef}
          links={[
            ...links,
            {
              name: "Home",
              href: "/",
              Icon: AiOutlineHome,
              isExternal: false
            },
            {
              name: "Dashboard",
              href: "https://dashboard.joshlevy.io/",
              Icon: MdAutoGraph,
              isExternal: true
            }
          ]}
          isStripeLoading={isStripeLoading}
          setIsStripeLoading={setIsStripeLoading}
          useTransition
          marginTop={"mt-14"}
        />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const blogPosts = await client.fetch(blogSlugsQuery);
  const paths = blogPosts.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { currentPost, otherPosts } = await client.fetch(articlePageQuery, {
    slug
  });
  const relatedPosts = otherPosts.filter(
    (post) =>
      post.slug !== slug &&
      post.tags.some((tag) => currentPost?.tags?.includes(tag))
  );
  const hasRelatedPosts = relatedPosts.length > 2;
  return {
    props: {
      currentPost,
      relatedPosts: hasRelatedPosts
        ? relatedPosts.slice(0, 4)
        : otherPosts.slice(0, 4),
      hasRelatedPosts
    }
  };
}
