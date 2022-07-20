import client from "lib/sanity.mjs";
import { hasIpQuery } from "lib/queries.mjs";
import { isIP } from "is-ip";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const {
    ip,
    slug,
    date,
    device,
    referrer,
    os,
    browser,
    city,
    region,
    country_name,
    region_code,
    country_code,
    latitude,
    longitude
  } = req.query;

  if (
    !isIP(ip) ||
    !slug ||
    !date ||
    !device ||
    !referrer ||
    !os ||
    !browser ||
    !city ||
    !region ||
    !country_name ||
    !region_code ||
    !country_code ||
    !latitude ||
    !longitude
  ) {
    return res.status(400).send("Query parameters are missing");
  }

  if (process.env.PERSONAL_IPS.split(",").includes(ip)) {
    return res.status(200).send("Personal IP");
  }

  try {
    const foundDoc = await client.fetch(hasIpQuery, {
      ip,
      slug
    });
    if (!foundDoc) {
      await client
        .patch(slug)
        .inc({ views: 1 })
        .append("locations", [
          {
            _key: ip,
            ip,
            date,
            device,
            referrer,
            os,
            browser,
            latLong: `${latitude},${longitude}`,
            shortName: `${city}, ${region_code}, ${country_code}`,
            longName: `${city}, ${region}, ${country_name}`
          }
        ])
        .commit();
    } else {
      await client.patch(slug).inc({ views: 1 }).commit();
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
