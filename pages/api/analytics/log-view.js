import client from "lib/sanity.mjs";
import { hasIpQuery } from "lib/queries.mjs";
import { isIP } from "is-ip";
import { parse } from "cookie";
import { verify } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { slug, referrer, date, timeSpent } = req.query;

  try {
    const token = parse(req.headers.cookie)?.token;

    const {
      ip,
      locationLong,
      locationShort,
      flag,
      latLong,
      device,
      os,
      browser
    } = verify(token, process.env.JWT_SECRET);

    if (
      !isIP(ip) ||
      !slug ||
      !referrer ||
      !date ||
      !timeSpent ||
      !locationLong ||
      !locationShort ||
      !flag ||
      !latLong ||
      !device ||
      !os ||
      !browser
    ) {
      return res.status(400).send("Parameters are missing");
    }

    const foundDoc = await client.fetch(hasIpQuery, { ip, slug });
    const viewingData = {
      _key: date,
      date,
      referrer,
      timeSpent: Math.min(Number(timeSpent), 300), // 5 mins max
      locationLong,
      locationShort,
      flag,
      latLong
    };
    if (!foundDoc) {
      await client
        .patch(slug)
        .inc({ views: 1 })
        .append("visitors", [
          {
            _key: ip,
            viewings: [viewingData],
            ip,
            device,
            os,
            browser
          }
        ])
        .commit();
    } else {
      await client
        .patch(slug)
        .inc({ views: 1 })
        .insert("after", `visitors[_key == \"${ip}\"].viewings[-1]`, [
          viewingData
        ])
        .commit();
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
