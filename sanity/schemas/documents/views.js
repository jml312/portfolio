import Location from "../../components/Location";

export default {
  name: "pageViews",
  title: "Views",
  type: "document",
  fields: [
    {
      name: "page",
      title: "Page",
      type: "string",
      readOnly: true
    },
    {
      name: "slug",
      title: "Slug",
      type: "string",
      readOnly: true
    },
    {
      name: "views",
      title: "Views",
      type: "number",
      readOnly: true,
      initialValue: 0
    },
    {
      name: "locations",
      title: "Locations",
      type: "array",
      readOnly: true,
      initialValue: [],
      of: [
        {
          type: "object",
          fields: [
            {
              title: "Latitude",
              name: "lat",
              type: "string",
              readOnly: true
            },
            {
              title: "Longitude",
              name: "long",
              type: "string",
              readOnly: true
            },
            {
              title: "IP",
              name: "ip",
              type: "string",
              readOnly: true
            },
            {
              title: "Date",
              name: "date",
              type: "datetime",
              readOnly: true
            }
          ],
          preview: {
            select: {
              ip: "ip"
            },
            prepare({ ip }) {
              return {
                ip
              };
            },
            component: Location
          }
        }
      ]
    },

    {
      name: "blogRef",
      title: "Blog Ref",
      type: "reference",
      to: [{ type: "blog" }],
      readOnly: true,
      hidden: ({ document }) => ["Home", "Blog"].includes(document.page)
    }
  ],
  preview: {
    select: {
      page: "page",
      views: "views"
    },
    prepare({ page, views }) {
      return { title: `${page} - ${views} view${views === 1 ? "" : "s"}` };
    }
  }
};
