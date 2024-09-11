export default {
  name: "projects",
  title: "Projects",
  type: "array",
  validation: (Rule) => Rule.required(),
  of: [
    {
      type: "object",
      fields: [
        {
          name: "title",
          title: "Project Title",
          type: "string",
          validation: (Rule) => Rule.required()
        },
        {
          name: "type",
          title: "Project Type",
          type: "string",
          validation: (Rule) => Rule.required(),
          options: {
            list: ["Personal", "Freelance"]
          }
        },
        {
          name: "description",
          title: "Project Description",
          type: "text",
          validation: (Rule) => Rule.required()
        },
        {
          name: "tags",
          title: "Tags",
          type: "array",
          of: [{ type: "string" }],
          validation: (Rule) => Rule.required()
        },
        {
          name: "website",
          title: "Website",
          type: "url"
        },
        {
          name: "github",
          title: "Github",
          type: "url"
        }
      ]
    }
  ]
};
