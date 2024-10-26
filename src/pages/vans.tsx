import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Badge } from "../components/badge";

export type Van = {
  id: number;
  make: string;
  model: string;
  type: string;
};

export function Vans() {
  const [vans, setVans] = useState<Van[]>([]);
  const [fetchStatus, setFetchStatus] = useState({
    status: "idle",
    error: "",
  });

  const typeFilter = [...new Set(vans.map((van) => van.type))];
  const makeFilter = [...new Set(vans.map((van) => van.make))];

  const [searchParams, setSearchParams] = useSearchParams();

  const filteredVans = searchParams.size
    ? vans.filter((van) => {
        return Array.from(searchParams.entries()).every(([key, value]) => {
          return van[key as keyof Van] === value;
        });
      })
    : vans;

  function concatSearchParams(key: string, value: string) {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);

      // Toggle the filter: remove if exists, add if not
      if (updatedParams.getAll(key).includes(value)) {
        updatedParams.delete(key); // Remove if already present
      } else {
        updatedParams.set(key, value); // Add or update parameter
      }

      return updatedParams;
    });
  }

  useEffect(() => {
    const fetchVans = async () => {
      setFetchStatus({ status: "loading", error: "" });

      // Construct query string based on current search parameters
      const queryString = searchParams.toString();
      const url = queryString ? `/api/vans?${queryString}` : "/api/vans";

      try {
        const response = await fetch(url);

        if (response.status === 404) {
          throw new Error("No vans found");
        }

        const data = await response.json();

        setVans(data);
        setFetchStatus({ status: "success", error: "" });
      } catch (error) {
        console.error("Error fetching vans:", error);

        if (error instanceof Error) {
          setFetchStatus({ status: "error", error: error.message });
        }
      }
    };

    fetchVans();
  }, [searchParams]);

  if (fetchStatus.status === "loading") {
    return <p>Loading...</p>;
  }

  if (fetchStatus.status === "error") {
    return (
      <>
        <p>Error: {fetchStatus.error}</p>
        <Link to=".">Search again</Link>
      </>
    );
  }

  return (
    <div>
      <h1>Vans</h1>
      {
        <ul>
          {typeFilter.map((type) => (
            <li key={type}>
              <Badge
                paramKey="type"
                param={type}
                onButtonClick={concatSearchParams}
              >
                {type}
              </Badge>
            </li>
          ))}

          <br />

          {makeFilter.map((make) => (
            <li key={make}>
              <Badge
                paramKey="make"
                param={make}
                onButtonClick={concatSearchParams}
              >
                {make}
              </Badge>
            </li>
          ))}
        </ul>
      }

      <Link to=".">Clean filter</Link>

      <ul style={{ display: "flex", flexDirection: "column" }}>
        {filteredVans.map((van) => (
          <Link
            to={`/vans/${van.id}`}
            key={van.id}
            state={{ search: searchParams.toString() }}
          >
            {van.make} {van.model}
          </Link>
        ))}
      </ul>
    </div>
  );
}
