import { useState, useEffect } from "react";
import throttle from "lodash/fp/throttle";

const useScrollSpy = ({
  activeSectionDefault = 0,
  offsetPx = 0,
  sectionElementRefs = [],
  throttleMs = 100
}) => {
  const [activeSection, setActiveSection] = useState(activeSectionDefault);

  const handle = throttle(throttleMs, () => {
    let currentSectionId = activeSection;
    for (let i = 0; i < sectionElementRefs.length; i++) {
      const section = sectionElementRefs[i].current;
      if (!section || !(section instanceof Element)) continue;
      if (section.getBoundingClientRect().top + offsetPx < 0) {
        currentSectionId = i;
        continue;
      }
      break;
    }
    setActiveSection(currentSectionId);
  });

  useEffect(() => {
    window.addEventListener("scroll", handle, {
      passive: true
    });
    handle();
    return () => {
      window.removeEventListener("scroll", handle, {
        passive: true
      });
    };
  }, [sectionElementRefs, offsetPx]);

  return activeSection;
};

export default useScrollSpy;
