import React, { useEffect, useState } from "react";

export default function Location({ value }) {
  const [location, setLocation] = useState(value?.ip);
  useEffect(() => {
    const getLocation = async () => {
      try {
        const response = await fetch(`http://ip-api.com/json/${value?.ip}`);
        const { city, region } = await response.json();
        setLocation(`${city}, ${region}`);
      } catch {
        setLocation(value?.ip);
      }
    };
    getLocation();
  }, []);
  return <span>{location}</span>;
}
