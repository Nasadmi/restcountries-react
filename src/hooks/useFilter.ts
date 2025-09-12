import { useMemo, useState } from "react"
import type { CountryCard } from "../api"

export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania' | null

export const useFilter = (list: CountryCard[] | null | undefined) => {
  const [region, setRegion] = useState<Region | null>(null);

  const filteredCountries = useMemo(() => {
    if (!list || !region) {
      return list;
    }

    return list.filter(country => country.region == region)

  }, [list, region])

  return { setRegion, filteredCountries }
}