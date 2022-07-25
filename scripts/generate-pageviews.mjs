import { blogPostsQuery } from "../lib/queries.mjs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.VERCEL_ENV === "production"
      ? undefined
      : resolve(dirname(fileURLToPath(import.meta.url)), "../.env.local")
});

async function generate() {
  const client = await import("../lib/sanity.mjs").then(
    (sanityClient) => sanityClient.default
  );
  const BLOG_PAGES = await client.fetch(blogPostsQuery);
  const ALL_PAGES = [
    { title: "Home", slug: "home" },
    { title: "Blog", slug: "blog" },
    ...BLOG_PAGES
  ];
  await Promise.all(
    ALL_PAGES.map(async ({ _id, title, slug }) => {
      await client.createIfNotExists({
        _id: slug,
        _type: "pageViews",
        page: title,
        slug,
        visitors: [],
        blogRef: { _type: "reference", _ref: _id }
      });
    })
  );
  console.log("Views generated ✅");
}

generate();
