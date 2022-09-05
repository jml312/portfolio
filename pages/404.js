import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath.startsWith("/blog/") ? "/blog" : "/";
    router.replace(path);
  }, []);

  return null;
}
