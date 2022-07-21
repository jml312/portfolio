import React from "react";

export default function Location({ value }) {
  return <span>{value?.title ?? "No Location"}</span>;
}
