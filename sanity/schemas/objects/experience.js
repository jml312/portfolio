export default {
  name: "experience",
  title: "Experience",
  type: "array",
  validation: (Rule) => Rule.required(),
  of: [
    {
      type: "object",
      fields: [
        {
          name: "title",
          title: "Experience Title",
          type: "string",
          validation: (Rule) => Rule.required()
        },
        {
          name: "company",
          title: "Company",
          type: "string",
          validation: (Rule) => Rule.required()
        },
        {
          name: "date",
          title: "Date",
          type: "string",
          validation: (Rule) => Rule.required()
        },
        {
          name: "link",
          title: "Link",
          type: "url",
          validation: (Rule) => Rule.required()
        }
      ]
    }
  ]
};
