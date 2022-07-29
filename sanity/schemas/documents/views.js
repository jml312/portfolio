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
      name: "visitors",
      title: "Visitors",
      type: "array",
      initialValue: [],
      of: [
        {
          type: "object",
          fields: [
            {
              name: "viewings",
              title: "Viewings",
              type: "array",
              initialValue: [],
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "date",
                      title: "Date",
                      type: "datetime"
                    },
                    {
                      title: "Time Spent (s)",
                      name: "timeSpent",
                      type: "number"
                    },
                    {
                      title: "Location (Long)",
                      name: "locationLong",
                      type: "string"
                    },
                    {
                      title: "Location (Short)",
                      name: "locationShort",
                      type: "string"
                    },
                    {
                      title: "Flag",
                      name: "flag",
                      type: "string"
                    },
                    {
                      title: "Lat, Long",
                      name: "latLong",
                      type: "string"
                    },
                    {
                      title: "Referrer",
                      name: "referrer",
                      type: "string"
                    }
                  ],
                  preview: {
                    select: {
                      locationShort: "locationShort",
                      flag: "flag"
                    },
                    prepare({ locationShort, flag }) {
                      return {
                        title: `${locationShort} ${flag}`
                      };
                    }
                  }
                }
              ]
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
              title: "IP",
              name: "ip",
              type: "string"
            }
          ],
          preview: {
            select: {
              viewings: "viewings"
            },
            prepare({ viewings }) {
              const viewingsCount = viewings.length;
              return {
                title: `${viewingsCount} view${viewingsCount === 1 ? "" : "s"}`
              };
            }
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
      return {
        title: `${page} - ${views} view${views === 1 ? "" : "s"}`
      };
    }
  }
};
