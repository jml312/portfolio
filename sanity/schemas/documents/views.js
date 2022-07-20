import Location from "../../components/Location";

export default {
  name: "pageViews",
  title: "Views",
  type: "document",
  fields: [
    {
      name: "page",
      title: "Page",
      type: "string"
    },
    {
      name: "slug",
      title: "Slug",
      type: "string"
    },
    {
      name: "views",
      title: "Views",
      type: "number",

      initialValue: 0
    },
    {
      name: "locations",
      title: "Locations",
      type: "array",

      initialValue: [],
      of: [
        {
          type: "object",
          fields: [
            {
              title: "Long Name",
              name: "longName",
              type: "string"
            },
            {
              title: "Short Name",
              name: "shortName",
              type: "string"
            },
            {
              title: "Lat, Long",
              name: "latLong",
              type: "string"
            },
            {
              title: "Device",
              name: "device",
              type: "string",
              options: {
                list: ["Mobile", "Tablet", "Laptop", "Desktop"]
              }
            },
            {
              title: "OS",
              name: "os",
              type: "string"
            },
            {
              title: "Browser",
              name: "browser",
              type: "string"
            },
            {
              title: "Referrer",
              name: "referrer",
              type: "string"
            },
            {
              title: "Date",
              name: "date",
              type: "datetime"
            },
            {
              title: "IP",
              name: "ip",
              type: "string"
            }
          ],
          preview: {
            select: {
              longName: "longName"
            },
            prepare({ longName }) {
              return {
                longName
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
