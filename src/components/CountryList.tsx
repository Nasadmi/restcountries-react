import type { CountryCard } from "../api";
import { Link } from "react-router";

export const CountryList = ({
  countries,
}: {
  countries: CountryCard[] | null | undefined;
}) => {
  return (
    <>
      {countries ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-8 justify-items-center mx-auto">
          {countries.map((country) => (
            <li
              key={country.cca3}
              className="rounded-2xl w-fit border-8 dark:border-neutral-900/20 border-gray-200/10"
            >
              <Link to={`/country/${country.cca3}`}>
                <img
                  src={country.flags.png}
                  alt={country.flags.alt}
                  className="w-[250px] h-[150px] rounded-t-lg"
                />
                <hr className="text-gray-100 dark:text-neutral-800 border-1" />
                <div className="[&>*]:ml-3 dark:[&>*]:text-white dark:bg-neutral-700 bg-white rounded-b-lg mt-[3.5px] pt-2 pb-1">
                  <h2 className="text-xl font-extrabold mb-2">
                    {country.name.common}
                  </h2>
                  <h3>
                    <strong>Population</strong>: {country.population.toLocaleString()}
                  </h3>
                  <h3>
                    <strong>Region</strong>: {country.region}
                  </h3>
                  <h3>
                    <strong>Capital</strong>: {country.capital[0]}
                  </h3>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : countries === null ? (
        <h1>Loading</h1>
      ) : (
        <h1>Not Found</h1>
      )}
    </>
  );
};
