export default {
  name: "codeBlock",
  title: "Code Block",
  type: "object",
  fields: [
    {
      name: "code",
      type: "code",
      title: "Code",
      validation: (Rule) => Rule.required()
    }
  ]
};
