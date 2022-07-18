import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config({
  path:
    process.env.VERCEL_ENV === "production"
      ? undefined
      : resolve(dirname(fileURLToPath(import.meta.url)), "../.env.local")
});
import client from "@sanity/client";

async function generate() {
  const sanityConfig = await import("../lib/sanity.mjs").then(
    (sanity) => sanity.sanityConfig
  );
  const sanityClient = client({ ...sanityConfig, dataset: "production" });
  await sanityClient
    .patch("home")
    .set({
      locations: [],
      views: 0
    })
    .commit();
  console.log("Server Views removed ✅");
}

generate();
