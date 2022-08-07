const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
const LIVE = "https://www.joshlevy.io";
const DEV = "http://localhost:3000";
const BASE_URL = isProd ? LIVE : DEV;
const MIN_PAGE_VIEW_TIME = 10;

export { BASE_URL, isProd, LIVE, DEV, MIN_PAGE_VIEW_TIME };
