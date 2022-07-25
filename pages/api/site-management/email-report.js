import { send } from "email-js";
import client from "lib/client";
import { unreadSubmissionsQuery, pageViewsQuery } from "lib/queries";

const fetchSanity = async (query) => await client.fetch(query);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  if (req.query.secret !== process.env.API_SECRET) {
    return res.status(401).send("Unauthorized");
  }

  try {
    const [unreadSubmisions, views] = await Promise.all(
      fetchSanity(unreadSubmissionsQuery),
      fetchSanity(pageViewsQuery)
    );
    await send();
  } catch {
    return res.status(500).json({ success: false });
  }
}
