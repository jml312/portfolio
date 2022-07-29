import { useEffect, useState } from "react";

const useLogView = (slug) => {
  const [startDate, setStartDate] = useState(new Date().getTime());

  const logData = () => {
    if (document.visibilityState === "hidden") {
      const now = new Date();
      const totalTime = (now.getTime() - startDate) / 1000;
      if (totalTime >= 10) {
        const referrer = document.referrer || "Direct / None";
        const date = now.toISOString();
        const timeSpent = Math.round(Number(totalTime));
        navigator.sendBeacon(
          `/api/analytics/log-view?slug=${slug}&referrer=${referrer}&date=${date}&timeSpent=${timeSpent}`
        );
      }
    } else {
      setStartDate(new Date().getTime());
    }
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", logData);
    return () => document.removeEventListener("visibilitychange", logData);
  }, [startDate, slug]);
};

export default useLogView;
