const isProd = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
const LIVE = "https://www.joshlevy.io";
const DEV = "http://localhost:3000";
const BASE_URL = isProd ? LIVE : DEV;
const DASHBOARD_URL = "dashboard.joshlevy.io";
const MIN_PAGE_VIEW_TIME = 5;

export { BASE_URL, isProd, LIVE, DEV, DASHBOARD_URL, MIN_PAGE_VIEW_TIME };
