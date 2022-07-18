import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { response } = req.body;
  try {
    const { success } = await (
      await fetch(
        `https://hcaptcha.com/siteverify?response=${response}&secret=${process.env.HCAPTCHA_SECRET_KEY}`,
        { method: "POST" }
      )
    ).json();
    return res.status(success ? 200 : 500).json({ success });
  } catch {
    return res.status(500).json({ success: false });
  }
}
