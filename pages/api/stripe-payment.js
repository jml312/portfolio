import { BASE_URL } from "../../constants/index.mjs";
import stripe from "stripe";
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const item = {
      price_data: {
        currency: "usd",
        product_data: { name: "Coffee Donation" },
        unit_amount: 500
      },
      quantity: 1
    };
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [item],
      mode: "payment",
      success_url: `${BASE_URL}/?payment=success`,
      cancel_url: `${BASE_URL}/?payment=cancel`
    });
    return res.status(200).json({ id: session.id, success: true });
  } catch {
    return res.status(500).json({ success: false });
  }
}
