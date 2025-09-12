import { useState, useEffect } from "react";

export const useTheme = () => {
  const root = document.documentElement.classList
  const [theme, setTheme] = useState(
    window.localStorage.getItem("theme") ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    if (theme === 'dark') {
      root.add('dark')
    } else {
      root.remove('dark')
    }
    localStorage.setItem('theme', theme);
  }, [theme, root])

  return { theme, setTheme }
};
