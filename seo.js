import { LIVE } from "constants";

const DEFAULT_SEO = {
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: LIVE,
    title: "Josh Levy - Fullstack Developer",
    description:
      "A fullstack developer with a passion for creating smooth, performant, and intuitive web applications.",
    tags: [
      "Portfolio",
      "Fullstack",
      "Developer",
      "Software Engineer",
      "Next.js",
      "React"
    ],
    site_name: "joshlevy.io",
    images: [
      {
        url: `${LIVE}/assets/joshlevyio.png`,
        width: 800,
        height: 600,
        alt: "joshlevy.io"
      }
    ]
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image"
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/logo/favicon.ico"
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/logo/apple-touch-icon.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/logo/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/logo/favicon-16x16.png"
    },
    {
      rel: "mask-icon",
      href: "/logo/safari-pinned-tab.svg",
      color: "#1C1D25"
    }
  ],
  additionalMetaTags: [
    {
      name: "theme-color",
      media: "(prefers-color-scheme: dark)",
      content: "#FFFFF5"
    },
    {
      name: "theme-color",
      media: "(prefers-color-scheme: light)",
      content: "#1C1D25"
    }
  ]
};

const IndexSEO = {
  ...DEFAULT_SEO,
  title: "Josh Levy – Fullstack Developer",
  description:
    "A fullstack developer with a passion for creating smooth, performant, and intuitive web applications.",
  canonical: LIVE
};

const BlogSEO = {
  ...DEFAULT_SEO,
  title: "Blog – Josh Levy",
  description:
    "Thoughts on web development, the software industry, experiences in tech, and my personal life.",
  canonical: `${LIVE}/blog`,
  openGraph: {
    ...DEFAULT_SEO.openGraph,
    url: `${LIVE}/blog`,
    description:
      "Thoughts on web development, the software industry, experiences in tech, and my personal life.",
    tags: ["Blog", ...DEFAULT_SEO.openGraph.tags]
  }
};

const ArticleSEO = {
  ...DEFAULT_SEO,
  openGraph: {
    ...DEFAULT_SEO.openGraph,
    tags: ["Blog", ...DEFAULT_SEO.openGraph.tags]
  }
};

export { IndexSEO, BlogSEO, ArticleSEO };
