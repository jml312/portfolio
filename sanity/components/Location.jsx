import React from "react";

export default function Location({ value }) {
  return <span>{value?.longName ?? "No Location"}</span>;
}
