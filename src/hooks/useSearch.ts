import debounce from "just-debounce-it";
import { useCallback, useState } from "react";
import type { CountryCard } from "../api";
import { API } from "../consts";

export const useSearch = () => {
  const [search, setSearch] = useState<string | null>(null);
  const [result, updateResult] = useState<CountryCard[] | null | undefined>(null);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.length === 0) {
        setSearch(null);
        updateResult(null);
        return;
      }

      setSearch((prevSearch) => {
        if (prevSearch === query) {
          return prevSearch;
        } else {
          (async () => {
            const res = await fetch(
              `${API}/name/${query}?fields=name,flags,population,capital,region,cca3`
            );
            if (!res.ok) {
              updateResult(undefined);
              return;
            }
            const json = (await res.json()) as CountryCard[];
            updateResult(json);
          })();
          return query;
        }
      });
    }, 300),
    []
  );

  return { search, result, debouncedSearch };
};
