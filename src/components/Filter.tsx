import type { ChangeEvent } from "react"
import type { Region } from "../hooks/useFilter";

export const Filter = ({ updateRegion }: { updateRegion: (region: Region | null) => void }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'nothing') {
      updateRegion(null);
    } else {
      const val = value as Region
      updateRegion(val)
    }
  }

  return (
    <div className="relative w-[60%]">
      <select
        onChange={handleChange}
        className="w-full p-4 bg-white appearance-none rounded-md pr-10 dark:bg-neutral-700 dark:text-white cursor-pointer"
      >
        <option value="Oceania">Oceania</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Americas">America</option>
        <option value="Africa">Africa</option>
        <option value="nothing" selected>Filter by Region</option>
      </select>
      {/* Custom arrow */}
      <svg
        className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  )
}