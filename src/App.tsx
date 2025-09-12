import type { CountryCard } from "./api"
import { Header } from "./components/Header"
import { useEffect, useState } from "react"
import { API } from "./consts"
import { useSearch } from "./hooks/useSearch"
import { CountryList } from "./components/CountryList"
import { Search } from "./components/Search"
import { Filter } from "./components/Filter"
import { useFilter } from "./hooks/useFilter"

function App() {
  const { result, debouncedSearch } = useSearch()
  const [countries, setCountries] = useState<CountryCard[] | null>(null)
  useEffect(() => {
    (async () => {
      const res = await fetch(`${API}/all?fields=name,flags,population,capital,region,cca3`);
      const json = await res.json() as CountryCard[];
      const data = json;

      setCountries(data);
    })()
  }, [])
  const { setRegion, filteredCountries } = useFilter(result ?? countries)


  return (
    <>
      <Header />
      <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between p-2">
        <Search onSearch={debouncedSearch} />
        <Filter updateRegion={setRegion}/>
      </div>
      <div className="w-[90%] m-auto flex flex-col justify-end items-center">
        <CountryList countries={filteredCountries} />
      </div>
    </>
  )
}

export default App
