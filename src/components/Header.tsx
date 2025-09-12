import { ThemeChanger } from "./ThemeChanger"

export const Header = () => {
  return (
    <header className="w-full pt-5 items-center h-[100px] pb-5 pl-1.5 pr-1.5 bg-white shadow-2xl/15 shadow-[rgba(0,0,0,0.5)] flex justify-between dark:bg-neutral-700 dark:text-white lg:h-[90px] lg:pr-10 lg:pl-10 mb-4">
      <h1 className="font-black text-lg lg:text-2xl lg:font-extrabold">Where in the world?</h1>
      <ThemeChanger />
    </header>
  )
}