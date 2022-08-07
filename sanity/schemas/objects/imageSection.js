export default {
  name: "imageSection",
  title: "Image Section",
  type: "object",
  fields: [
    {
      name: "alt",
      title: "Alt Text",
      type: "string"
    },
    {
      title: "Image",
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required()
    }
  ]
};

