import slugify from "slugify";

export default {
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required()
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      },
      slugify: (title) => slugify(title, { lower: true, remove: /[?!':]/g }),
      validation: (Rule) => Rule.required()
    },
    {
      title: "Published",
      name: "published",
      type: "datetime",
      validation: (Rule) => Rule.required()
    },
    {
      title: "Description",
      name: "description",
      type: "text",
      validation: (Rule) => Rule.required()
    },
    {
      title: "Tags",
      name: "tags",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required()
    },
    {
      title: "Post",
      name: "post",
      type: "array",
      of: [
        {
          type: "block"
        },
        {
          type: "imageSection"
        },
        {
          type: "codeBlock"
        }
      ],
      validation: (Rule) => Rule.required()
    }
  ]
};
