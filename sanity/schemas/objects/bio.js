export default {
  name: "bio",
  title: "Bio",
  type: "array",
  of: [
    {
      type: "block"
    }
  ],
  validation: (Rule) => Rule.required()
};
