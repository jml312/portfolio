import { serialize } from "cookie";
import { sign } from "jsonwebtoken";
import { isIP } from "is-ip";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { ip, locationLong, locationShort, latLong, device, os, browser } =
    req.body;

  if (
    !isIP(ip) ||
    !locationLong ||
    !locationShort ||
    !latLong ||
    !device ||
    !os ||
    !browser
  ) {
    return res.status(400).send("Parameters are missing");
  }

  const token = sign(
    {
      ip,
      locationLong,
      locationShort,
      latLong,
      device,
      os,
      browser
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
}
