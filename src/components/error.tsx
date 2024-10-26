import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorFallback() {
  const error = useRouteError();

  const errorMessage = getErrorMessage(error);
  console.log(error);

  return (
    <div>
      <h1>Oops! Something went wrong</h1>
      <p>{errorMessage}</p>
    </div>
  );
}

function getErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return `Error: ${error.status} - ${error.statusText}`;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  }
}
