import client from "lib/sanity.mjs";
import { hasIpQuery } from "lib/queries.mjs";
import { isIP } from "is-ip";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const { ip, slug } = req.query;

  if (!isIP(ip) || !slug) {
    return res.status(400).send("IP or slug is missing or invalid");
  }

  try {
    const foundDoc = await client.fetch(hasIpQuery, {
      ip,
      slug
    });

    if (!foundDoc) {
      await client
        .patch(slug)
        .setIfMissing({ locations: [] })
        .inc({ views: 1 })
        .append("locations", [
          {
            _key: ip,
            ip,
            date: new Date().toISOString()
          }
        ])
        .commit();
    } else {
      await client
        .patch(slug)
        .inc({ views: 1 })
        .commit();
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
