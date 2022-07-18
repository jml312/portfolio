const getSlug = (pathname) => {
  if (pathname === "/") {
    return "home";
  } else if (pathname === "/blog") {
    return "blog";
  } else if (pathname.startsWith("/blog/")) {
    return pathname.split("/blog/")[1];
  } else return "";
};

export default getSlug;
