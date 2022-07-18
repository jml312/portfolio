import client from "@sanity/client";

export const sanityConfig = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2022-01-18"
};

export default client(sanityConfig);
