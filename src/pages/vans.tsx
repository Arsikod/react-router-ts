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
  const [status, setStatus] = useState("idle");

  const typeFilter = [...new Set(vans.map((van) => van.type))];
  const makeFilter = [...new Set(vans.map((van) => van.make))];

  const [searchParams, setSearchParams] = useSearchParams();

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
      setStatus("loading");

      // Construct query string based on current search parameters
      const queryString = searchParams.toString();
      const url = queryString ? `/api/vans?${queryString}` : "/api/vans";

      try {
        const response = await fetch(url);
        const data = await response.json();
        setVans(data);
      } catch (error) {
        console.error("Error fetching vans:", error);
      } finally {
        setStatus("idle");
      }
    };

    fetchVans();
  }, [searchParams]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Vans</h1>
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

      <Link to=".">Clean filter</Link>

      <ul style={{ display: "flex", flexDirection: "column" }}>
        {vans.map((van) => (
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
