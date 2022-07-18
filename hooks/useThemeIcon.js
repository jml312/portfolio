import { useState, useEffect } from "react";
import { BsMoonStars } from "react-icons/bs";
import { CgSun } from "react-icons/cg";

const useThemeIcon = (theme) => {
  const [ThemeIcon, setThemeIcon] = useState(<CgSun />);

  useEffect(() => {
    if (theme === "light") {
      setThemeIcon(<BsMoonStars />);
    } else {
      setThemeIcon(<CgSun />);
    }
  }, [theme]);

  return ThemeIcon;
};

export default useThemeIcon;
