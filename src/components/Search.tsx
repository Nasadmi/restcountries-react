import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { ChangeEvent } from "react"

export const Search = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearch(value)
  }
  
  return (
    <nav className="flex justify-left bg-white rounded-[10px] w-[95%] p-3 pl-7 gap-3 items-center border-[1.75px] border-transparent focus-within:border-purple-600 duration-200 transition-all dark:bg-neutral-700">
      <MagnifyingGlassIcon className="size-5 text-gray-500 dark:text-white" strokeWidth={'2px'}/>
      <input type="text" onChange={handleChange} className="outline-0 placeholder:font-light font-medium text-base dark:text-white dark:placeholder:text-white w-[100%]" placeholder="Search for a country"/>
    </nav>
  )
}