import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export type Van = {
  id: number;
  make: string;
  model: string;
};

export function Vans() {
  const [vans, setVans] = useState<Van[]>([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    setStatus("loading");
    fetch("/api/vans")
      .then((response) => response.json())
      .then((data) => setVans(data))
      .finally(() => setStatus("idle"));
  }, []);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Vans</h1>
      <ul style={{ display: "flex", flexDirection: "column" }}>
        {vans.map((van) => (
          <Link to={`/vans/${van.id}`} key={van.id}>
            {van.make} {van.model}
          </Link>
        ))}
      </ul>
    </div>
  );
}
