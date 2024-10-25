import { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";
import { Van } from "../van";

export function VanList() {
  const [hostVans, setHostVans] = useState<Van[]>([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    //host/vans
    setStatus("loading");
    fetch("/api/host/vans")
      .then((response) => response.json())
      .then((data) => setHostVans(data))
      .finally(() => setStatus("idle"));
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <ul
      style={{
        display: "flex",
        gap: "10px",
      }}
    >
      {hostVans.map((van) => (
        <li
          key={van.id}
          style={{
            listStyle: "none",
          }}
        >
          <NavLink to={`/host/vans/${van.id}`}>
            {van.make} {van.model}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
