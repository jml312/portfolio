import { parse } from "cookie";
import { verify } from "jsonwebtoken";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method Not Allowed");
  }

  const token = parse(req?.headers?.cookie || "")?.token;
  if (!token) {
    return res.status(400).send(false);
  }

  try {
    const foundData = token ? !!verify(token, process.env.JWT_SECRET) : false;
    return res.status(foundData ? 200 : 400).send(foundData);
  } catch {
    return res.status(500).send(false);
  }
}
