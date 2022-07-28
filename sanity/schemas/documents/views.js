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
                    prepare({ locationShort }) {
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
      visitors: "visitors"
    },
    prepare({ page, visitors }) {
      const viewCount =
        visitors?.reduce((acc, curr) => acc + curr.viewings.length, 0) || 0;
      return {
        title: `${page} - ${viewCount} view${viewCount === 1 ? "" : "s"}`
      };
    }
  }
};
