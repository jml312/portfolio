import client from "lib/sanity.mjs";
import { blogSlugsQuery } from "lib/queries.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  if (req.query.secret !== process.env.API_SECRET) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const blogPosts = await client.fetch(blogSlugsQuery);
    const pages = ["/", "/blog", ...blogPosts.map((post) => `/blog/${post}`)];
    await Promise.all(pages.map(async (page) => await res.revalidate(page)));

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
