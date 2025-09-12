import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../hooks/useTheme";

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <button
      className="text-sm font-medium flex items-center gap-2 cursor-pointer rounded-xl lg:hover:bg-[rgba(0,0,0,0.2)] p-2 transition-all duration-400"
      onClick={handleClick}
    >
      {theme === "dark" ? (
        <>
          <SunIcon className="size-5" />{" "}
          <span className="whitespace-nowrap">Light Mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="size-5" />{" "}
          <span className="whitespace-nowrap">Dark Mode</span>
        </>
      )}
    </button>
  );
};
