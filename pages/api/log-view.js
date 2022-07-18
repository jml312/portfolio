import client from "lib/sanity.mjs";
import fetch from "node-fetch";
import { serialize, parse } from "cookie";
import { sign, verify } from "jsonwebtoken";
import { hasIpQuery } from "lib/queries.mjs";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const slug = req?.query?.slug;

  if (!slug) {
    return res.status(400).send("No Slug");
  }

  const token = parse(req.headers.cookie || "")?.token;
  let location;
  try {
    location = verify(token, process.env.JWT_SECRET);
  } catch {
    try {
      const {
        ip,
        location: { latitude, longitude }
      } = await (
        await fetch(
          `https://api.bigdatacloud.net/data/ip-geolocation?key=${process.env.IP_LOCATION_API_KEY}`
        )
      ).json();

      location = {
        ip: ip.toString(),
        lat: latitude.toString(),
        long: longitude.toString(),
        date: new Date().toISOString()
      };
      const signedToken = sign(location, process.env.JWT_SECRET);
      res.setHeader(
        "Set-Cookie",
        serialize("token", signedToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 2147483647),
          maxAge: 2147483647
        })
      );
    } catch {
      return res.status(500).json({ success: false });
    }
  }

  try {
    const foundDoc = await client.fetch(hasIpQuery, {
      slug,
      ip: location.ip
    });

    if (!foundDoc) {
      await client
        .patch(slug)
        .inc({ views: 1 })
        .append("locations", [
          {
            _key: location.ip,
            lat: location.lat,
            long: location.long,
            ip: location.ip,
            date: location.date
          }
        ])
        .commit();
    } else {
      await client.patch(slug).inc({ views: 1 }).commit();
    }

    return res.status(200).json({ success: true });
  } catch (e) {
    return res.status(500).json({ success: false, message: e.message, e });
  }
}
