import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API } from "../consts";
import { type Country, CCA2ToName } from "../api.d";
import { Header } from "../components/Header";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import CCA3_TO_CCA2 from "../../cca3-to-cca2.json";

type Details = Pick<
  Country,
  | "name"
  | "population"
  | "region"
  | "subregion"
  | "capital"
  | "tld"
  | "currencies"
  | "languages"
  | "borders"
  | "flags"
>;

function getCCA2Val(cca3: string) {
  return CCA3_TO_CCA2.find((val) => val.cca3 === cca3);
}

export const CountryDetail = () => {
  const [country, setCountry] = useState<Details | null | undefined>(null);
  const params = useParams();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${API}/alpha/${params.cca3}`);

      if (!res.ok) setCountry(undefined);
      const json = (await res.json()) as Details[];
      const data = json;

      setCountry(data[0]);
    })();
  }, [params]);

  useEffect(() => {
    console.log(country);
  }, [country]);

  return (
    <>
      <Header />
      <main className="w-[90%] mx-auto mt-auto mb-5 dark:[&>*]:text-white">
        <Link
          to={"/"}
          className="flex items-center gap-3 pl-3 pr-3 pt-1 pb-1 rounded-sm dark:bg-neutral-600 bg-white w-[120px] justify-center shadow-[0_0_5px_rgba(0,0,0,0.5)] cursor-pointer mb-15 mt-10"
        >
          <ArrowLeftIcon className="size-5" strokeWidth="30" />
          Back
        </Link>
        {country ? (
          <section className="flex flex-col justify-center items-center md:flex-row gap-10 md:gap-20 w-[100%]">
            <img
              src={country.flags.png}
              alt={country.flags.alt}
              className="h-[250px] w-[350px] border-gray-700/10 border-8 rounded"
            />
            <article>
              <h1 className="font-extrabold text-2xl mt-5 mb-5 md:mt-0 md:mb-2">
                {country.name.common}
              </h1>
              <div className="md:flex gap-30">
                <ul className="[&>li>span]:font-bold flex flex-col gap-1.5">
                  <li>
                    <span>Native Name</span>:{" "}
                    {Object.values(country.name.nativeName)
                      .map((name) => name.common)
                      .join(", ")}
                    .
                  </li>
                  <li>
                    <span>Population</span>:{" "}
                    {country.population.toLocaleString()}.
                  </li>
                  <li>
                    <span>Region</span>: {country.region}.
                  </li>
                  <li>
                    <span>Sub Region</span>: {country.subregion}.
                  </li>
                  <li>
                    <span>Capital</span>: {country.capital.join(", ")}.
                  </li>
                </ul>
                <ul className="[&>li>span]:font-bold mt-5 flex flex-col gap-1.5">
                  <li>
                    <span>Top Level Domain</span>: {country.tld.join(", ")}
                  </li>
                  <li>
                    <span>Currencies</span>:{" "}
                    {Object.values(country.currencies)
                      .map((val) => `${val.name}(${val.symbol})`)
                      .join(", ")}
                    .
                  </li>
                  <li>
                    <span>Languages</span>:{" "}
                    {Object.values(country.languages)
                      .map((lang) => `${lang}`)
                      .join(", ")}
                    .
                  </li>
                </ul>
              </div>
              <h2 className="mb-2 mt-6 text-xl font-bold">Border Countries:</h2>
              <ul className="flex flex-wrap gap-5">
                {country.borders && country.borders.length > 0 ? (
                  country.borders.map((code) => {
                    const cca2Obj = getCCA2Val(code);
                    const cca2 = cca2Obj?.cca2;
                    const name = cca2
                      ? CCA2ToName[cca2 as keyof typeof CCA2ToName] ?? code
                      : code;
                    return (
                      <li key={code}>
                        <Link
                          to={`/country/${code}`}
                          className="px-2 py-1 dark:bg-neutral-600 bg-white rounded shadow-[0_0_5px_rgba(0,0,0,0.2)]"
                        >
                          {name}
                        </Link>
                      </li>
                    );
                  })
                ) : (
                  <li>This country doesn't have borders</li>
                )}
              </ul>
            </article>
          </section>
        ) : country === null ? (
          <h1>Loading</h1>
        ) : (
          <h1>Not Found</h1>
        )}
      </main>
    </>
  );
};
