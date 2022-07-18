import React from "react";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Location({ value }) {
  const { data } = useSWR(`http://ip-api.com/json/${value?.ip}`, fetcher);
  const location = `${data?.city}, ${data?.region}, ${data?.countryCode}`;
  return <span>{location || value?.ip}</span>;
}
