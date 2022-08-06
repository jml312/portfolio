import client from "lib/sanity.mjs";
import { hasIpQuery } from "lib/queries.mjs";
import { isIP } from "is-ip";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

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

  try {
    const foundDoc = await client.fetch(hasIpQuery, { ip, slug });
    if (!foundDoc) {
      await client
        .patch(slug)
        .append("visitors", [
          {
            _key: ip,
            viewDates: [date],
            ip,
            device,
            referrer,
            os,
            browser,
            latLong: `${latitude}, ${longitude}`,
            city,
            region,
            regionCode: region_code,
            countryName: country_name,
            countryCode: country_code
          }
        ])
        .commit();
    } else {
      await client
        .patch(slug)
        .insert("after", `visitors[_key == \"${ip}\"].viewDates[-1]`, [date])
        .commit();
    }

    const token = sign(
      {
        ip,
        city,
        region,
        country_name,
        region_code,
        country_code,
        latitude,
        longitude,
        os,
        browser,
        device
      },
      process.env.JWT_SECRET
    );
    res.setHeader(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 34560000
      })
    );

    return res.status(200).json({ success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
