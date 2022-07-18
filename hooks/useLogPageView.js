import { useEffect } from "react";
import { isProd } from "constants";
import { useRouter } from "next/router";

const useLogPageView = () => {
  const { asPath } = useRouter();
  useEffect(() => {
    if (typeof window === "undefined") return;
    const logView = async () => {
      try {
        const slug = getSlug(asPath);
        if (!slug) return;
        await fetch("/api/log-view", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ slug })
        });
      } catch {}
    };
    if (isProd) logView();
  }, [asPath]);
};

const getSlug = (pathname) => {
  if (pathname === "/") {
    return "home";
  } else if (pathname === "/blog") {
    return "blog";
  } else if (pathname.startsWith("/blog/")) {
    return pathname.split("/blog/")[1];
  } else return "";
};

export default useLogPageView;
