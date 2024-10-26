import { LoaderFunctionArgs } from "react-router-dom";

export async function vansLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const queryString = url.search;

  const apiUrl = queryString ? `/api/vans${queryString}` : "/api/vans";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error("Failed to fetch vans");
    }

    const data = await response.json();

    return { vans: data, error: "" };
  } catch (error) {
    if (error instanceof Error) {
      return { vans: [], error: error.message };
    }
  }
}
