import client from "lib/sanity.mjs";
import Footer from "components/Footer";
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";
import { HiMail } from "react-icons/hi";
import { FaLinkedinIn, FaGithubAlt } from "react-icons/fa";
import StripeLoader from "components/StripeLoader";
import { useRef, useState, useEffect } from "react";
import ArticleCard from "components/Articles/ArticleCard";
import BlogNav from "components/BlogNav";
import Fuse from "fuse.js";
import { NextSeo } from "next-seo";
import { BlogSEO } from "seo";
import { blogPageQuery } from "lib/queries.mjs";
import { MdAutoGraph } from "react-icons/md";

export default function Blog({ blogPosts, allTags }) {
  const footerRef = useRef();
  const { theme, setTheme } = useTheme();
  const [filteredBlogPosts, setFilteredBlogPosts] = useState([]);
  const [searchTags, setSearchTags] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isStripeLoading, setIsStripeLoading] = useState(false);
  const [useTransition, setUseTransition] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const fuse = new Fuse(blogPosts, {
    threshold: 0.35,
    location: 0,
    distance: 100,
    minMatchCharLength: 1,
    shouldSort: true,
    includeScore: true,
    keys: ["title", "tags"]
  });

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

  useEffect(() => {
    if (searchValue === "" && searchTags.length === 0) {
      setFilteredBlogPosts([...blogPosts]);
    } else {
      const formattedTags = [...searchTags.map((tags) => ({ tags }))];
      const formattedTitle = searchValue.length ? [{ title: searchValue }] : [];
      const queries = {
        $or: [
          { tags: searchValue },
          { title: searchValue },
          { $and: [...formattedTags, ...formattedTitle] }
        ]
      };
      const results = fuse.search(queries).map(({ item }) => item);
      setFilteredBlogPosts(results);
    }
  }, [searchValue, searchTags]);

  if (isStripeLoading) return <StripeLoader />;

  return (
    <>
      <NextSeo {...BlogSEO} />
      <main
        className={
          "flex flex-col justify-between items-center text-center mt-10 gap-2 mx-auto min-w-[21rem] max-w-3xl px-4 min-h-screen"
        }
      >
        <BlogNav
          theme={theme}
          setTheme={setTheme}
          links={links}
          useTransition={useTransition}
          setUseTransition={setUseTransition}
        />

        <div
          className={
            "flex flex-col items-start justify-center mt-10 mb-16 text-left"
          }
        >
          <h1
            className={
              "text-4xl mb-3.5 font-bold tracking-tight text-dark md:text-5xl dark:text-light"
            }
          >
            Blog
          </h1>
          <p className={"mb-4 text-[1rem] sm:text-[1.05rem]"}>
            I mostly write about web development and my experiences in tech. In
            total, I've written {blogPosts.length} articles on my blog. Use the
            search below to filter by title or select a tag.
          </p>
          <div className={"w-full relative mb-1"}>
            <input
              type="search"
              name="search"
              aria-label="Search articles"
              placeholder="Search articles"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={
                "block w-full px-4 py-2 rounded-md text-dark border-[0.5px] border-dark dark:border-light dark:text-light focus:ring-blue-500 focus:border-blue-500 bg-[rgba(255,255,245,0.9)] dark:bg-[rgba(28,29,37,0.9)]"
              }
            />
            <AiOutlineSearch
              className={
                "absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              }
            />
          </div>
          <div
            className={
              "flex flex-wrap gap-x-3.5 gap-y-4 w-full mt-[.925rem] -mb-1"
            }
          >
            {allTags.map((tag) => (
              <label key={tag}>
                <input
                  className={
                    "appearance-none peer [clip:rect(0px_0px_0px_0px)] border-none h-1 w-1 -m-1 p-0 overflow-hidden absolute whitespace-nowrap"
                  }
                  type="checkbox"
                  name="tag"
                  value={tag}
                  checked={searchTags.includes(tag)}
                  onChange={() => {
                    if (searchTags.includes(tag)) {
                      setSearchTags(searchTags.filter((_tag) => _tag != tag));
                    } else {
                      setSearchTags([...searchTags, tag]);
                    }
                  }}
                />
                <div
                  className={`text-[.85rem] sm:text-[.9rem] text-center cursor-pointer rounded-md px-2 py-0.5 ring-dark dark:ring-light ring-1 peer-checked:ring-[2.5px] dark:peer-checked:ring-[2.5px] dark:bg-dark bg-light active:scale-95`}
                >
                  {tag}
                </div>
              </label>
            ))}
          </div>
          {!searchValue && !searchTags.length && (
            <>
              <h3 className="self-start mt-8 mb-4 text-[1.75rem] font-bold tracking-tight text-dark md:text-4xl dark:text-light">
                Most Popular
              </h3>
              <div
                className={
                  "flex flex-col justify-start items-start w-full gap-5"
                }
              >
                {blogPosts
                  .slice(0, 3)
                  .map(
                    ({
                      title,
                      slug,
                      description,
                      published,
                      post,
                      tags,
                      views
                    }) => (
                      <ArticleCard
                        key={title}
                        title={title}
                        slug={slug}
                        tags={tags}
                        published={published}
                        post={post}
                        description={description}
                        views={views}
                        prefersReducedMotion={prefersReducedMotion}
                        isInBlog
                      />
                    )
                  )}
              </div>
            </>
          )}
          <h3 className="self-start mt-8 mb-4 text-[1.75rem] font-bold tracking-tight text-black md:text-4xl dark:text-white">
            All Posts
          </h3>
          {!filteredBlogPosts.length && (
            <p className={"mb-24"}>No posts found.</p>
          )}
          {filteredBlogPosts.length > 0 && (
            <div
              className={`flex flex-col justify-start items-start w-full gap-5`}
            >
              {filteredBlogPosts.map(
                ({
                  title,
                  slug,
                  description,
                  published,
                  post,
                  tags,
                  views
                }) => (
                  <ArticleCard
                    key={title}
                    title={title}
                    slug={slug}
                    tags={tags}
                    published={published}
                    post={post}
                    description={description}
                    prefersReducedMotion={prefersReducedMotion}
                    views={views}
                    isInBlog
                  />
                )
              )}
            </div>
          )}
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
              name: "Analytics",
              href: "https://dashboard.joshlevy.io/",
              Icon: MdAutoGraph,
              isExternal: true
            }
          ]}
          isStripeLoading={isStripeLoading}
          setIsStripeLoading={setIsStripeLoading}
          useTransition={useTransition}
          marginTop={"-mt-4"}
        />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const blogPosts = await client.fetch(blogPageQuery);
  return {
    props: {
      blogPosts,
      allTags: [...new Set(blogPosts.flatMap(({ tags }) => tags))]
    }
  };
}
