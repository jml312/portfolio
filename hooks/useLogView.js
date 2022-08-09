import { useEffect, useState } from "react";
import { MIN_PAGE_VIEW_TIME } from "constants/index.mjs";

const useLogView = (slug) => {
  const [startDate, setStartDate] = useState(
    new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "America/New_York"
      })
    ).getTime()
  );

  const logData = () => {
    if (document.visibilityState === "hidden") {
      const now = new Date(
        new Date().toLocaleString("en-US", {
          timeZone: "America/New_York"
        })
      );
      const totalTime = (now.getTime() - startDate) / 1000;
      if (totalTime >= MIN_PAGE_VIEW_TIME) {
        const referrer = document.referrer || "Direct / None";
        const date = now.toISOString();
        const timeSpent = Math.round(Number(totalTime));
        navigator.sendBeacon(
          `/api/analytics/log-view?slug=${slug}&referrer=${referrer}&date=${date}&timeSpent=${timeSpent}`
        );
      }
    } else {
      setStartDate(
        new Date(
          new Date().toLocaleString("en-US", {
            timeZone: "America/New_York"
          })
        ).getTime()
      );
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", logData);
    return () => document.removeEventListener("visibilitychange", logData);
  }, [startDate, slug]);
};

export default useLogView;
