import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <>
      <Link to="/">Back to dashboard</Link>

      <h3>Not found</h3>
    </>
  );
}
