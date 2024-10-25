import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export type Van = {
  id: number;
  make: string;
  model: string;
};

export function Van() {
  const { vanId } = useParams();

  const [van, setVan] = useState<Van | null>(null);

  const { state } = useLocation();

  useEffect(() => {
    fetch(`/api/vans/${vanId}`)
      .then((response) => response.json())
      .then((data) => setVan(data));
  }, [vanId]);

  if (!van) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Link to={`/vans?${state?.search ?? ""}`}>Back</Link>
      <pre>{JSON.stringify(van, null, 2)}</pre>;
    </>
  );
}
