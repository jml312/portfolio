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
      name: "visitors",
      title: "Visitors",
      type: "array",
      initialValue: [],
      of: [
        {
          type: "object",
          fields: [
            {
              name: "viewDates",
              title: "View Dates",
              type: "array",
              initialValue: [],
              of: [
                {
                  type: "datetime"
                }
              ]
            },
            {
              title: "City",
              name: "city",
              type: "string"
            },
            {
              title: "Region",
              name: "region",
              type: "string"
            },
            {
              title: "Region Code",
              name: "regionCode",
              type: "string"
            },
            {
              title: "Country Name",
              name: "countryName",
              type: "string"
            },
            {
              title: "Country Code",
              name: "countryCode",
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
              title: "IP",
              name: "ip",
              type: "string"
            }
          ],
          preview: {
            select: {
              city: "city",
              region: "region",
              countryName: "countryName",
              viewDates: "viewDates"
            },
            prepare({ city, region, countryName, viewDates }) {
              const viewCount = viewDates.length;
              return {
                title: `${city}, ${region}, ${countryName} - ${viewCount} view${
                  viewCount === 1 ? "" : "s"
                }`
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
      visitors: "visitors"
    },
    prepare({ page, visitors }) {
      const viewCount = visitors.reduce(
        (acc, curr) => acc + curr.viewDates.length,
        0
      );
      return {
        title: `${page} - ${viewCount} view${viewCount === 1 ? "" : "s"}`
      };
    }
  }
};
