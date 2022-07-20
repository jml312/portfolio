export default {
  name: "submissions",
  title: "Submissions",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string"
    },
    {
      name: "email",
      title: "Email",
      type: "string"
    },
    {
      name: "message",
      title: "Message",
      type: "text"
    },
    {
      name: "date",
      title: "Date",
      type: "datetime"
    },
    {
      name: "isRead",
      title: "Is Read",
      type: "boolean",
      initialValue: false
    }
  ]
};
