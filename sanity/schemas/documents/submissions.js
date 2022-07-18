export default {
  name: "submissions",
  title: "Submissions",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true
    },
    {
      name: "message",
      title: "Message",
      type: "text",
      readOnly: true
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
      readOnly: true
    },
    {
      name: "isRead",
      title: "Is Read",
      type: "boolean",
      readOnly: true,
      initialValue: false
    }
  ]
};
