import { writeFileSync } from "fs";
import prettier from "prettier";
import { LIVE } from "../constants/index.mjs";
import { blogSlugsQuery } from "../lib/queries.mjs";
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
  const blogPosts = await client.fetch(blogSlugsQuery);
  const sitemap = `
      <?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>
            ${LIVE}
          </loc>
        </url>

        <url>
          <loc>
            ${LIVE}/blog
          </loc>
        </url>

        ${blogPosts
          .map(
            (slug) => `
              <url>
                  <loc>
                    ${LIVE}/blog/${slug}
                </loc>
              </url>
            `
          )
          .join("")}
      </urlset>
      `;
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html"
  });
  writeFileSync("public/sitemap.xml", formatted);
  console.log("Sitemap generated ✅");
}

generate();
