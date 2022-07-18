import client from "lib/sanity.mjs";
import { hasSubmittedQuery } from "lib/queries.mjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }
  const { name, email, message } = req.body;

  try {
    const hasSubmitted = await client.fetch(hasSubmittedQuery, {
      name,
      email
    });

    if (hasSubmitted) {
      return res.status(200).json({
        hasSubmitted: true,
        success: true
      });
    }

    await client.create({
      _type: "submissions",
      name,
      email,
      message,
      date: new Date().toISOString(),
      isRead: false
    });
    return res.status(200).json({ hasSubmitted: false, success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
