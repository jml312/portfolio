import React from "react";

export default function Location({ value }) {
  return <span>{value?.ip ?? "No IP"}</span>;
}
