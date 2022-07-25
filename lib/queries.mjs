const indexPageQuery = `
  *[_type == "portfolio"][0] {
      'resume': resume.asset._ref,
      'bio': bio[],
      projects[] {
      title,
      type,
      description,
      tags,
      website,
      github,
    },
    experience[] {
      title,
      company,
      date,
      link,
    },
    'blogPosts': *[_type == "blog"] {
      title,
      'slug': slug.current,
      description,
      tags,
      published,
      "views": *[_type == "pageViews" && ^.slug.current == slug][0].views,
    } | order(views desc, published desc)[0...5]
  }
`;

const blogPageQuery = `
  *[_type == "blog"] {
    title,
    'slug': slug.current,
    published,
    description,
    tags,
    "views": *[_type == "pageViews" && ^.slug.current == slug][0].views,
  } | order(views desc, published desc)
`;

const articlePageQuery = `
  *[_type == "blog"][0] {
    'currentPost': *[_type == "blog" && slug.current == $slug][0] {
      title,
      'slug': slug.current,
      published,
      description,
      tags,
      post[],
      "views": *[_type == "pageViews" && ^.slug.current == slug][0].views,
  	},
    'otherPosts': *[_type == "blog" && slug.current != $slug] {
      title,
      'slug': slug.current,
      published,
      description,
      tags,
      post[],
      "views": *[_type == "pageViews" && ^.slug.current == slug][0].views,
    },
  }
`;

const blogSlugsQuery = `*[_type == "blog"].slug.current`;

const blogPostsQuery = `*[_type == "blog"] { 
    _id,
    title, 
    'slug': slug.current
  }
`;

const unreadSubmissionsQuery = `*[_type == "submissions" && !isRead] {
  name,
  email,
  date,
} | order(date desc)`;

const pageViewsQuery = `*[_type == "pageViews"] {
  page,
  slug,
  views,
}`;

const hasSubmittedQuery = `defined(*[_type == 'submissions' && lower(name) == lower($name) && lower(email) == lower($email)][0])`;

const hasIpQuery = `defined(*[_type == "pageViews" && $slug == slug && $ip in visitors[].ip][0])`;

export {
  indexPageQuery,
  blogPageQuery,
  blogPostsQuery,
  articlePageQuery,
  blogSlugsQuery,
  unreadSubmissionsQuery,
  pageViewsQuery,
  hasSubmittedQuery,
  hasIpQuery
};
