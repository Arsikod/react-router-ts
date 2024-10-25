import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

export type Van = {
  id: number;
  make: string;
  model: string;
};

export function Van() {
  const { vanId } = useParams();

  const [van, setVan] = useState<Van | null>(null);

  useEffect(() => {
    fetch(`/api/vans/${vanId}`)
      .then((response) => response.json())
      .then((data) => setVan(data));
  }, [vanId]);

  if (!van) {
    return <p>Loading...</p>;
  }

  return <pre>{JSON.stringify(van, null, 2)}</pre>;
}
