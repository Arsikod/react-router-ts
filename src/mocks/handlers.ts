import { HttpResponse, delay, http } from "msw";

import { Van } from "../pages/vans";

const vans: Van[] = [
  { id: 1, make: "Ford", model: "Transit", type: "luxury" },
  {
    id: 2,
    make: "Mercedes",
    model: "Sprinter",
    type: "luxury",
  },
  { id: 3, make: "Volkswagen", model: "Crafter", type: "luxury" },
  { id: 4, make: "Renault", model: "Master", type: "econom" },
  {
    id: 5,
    make: "Peugeot",
    model: "Boxer",
    type: "econom",
  },
  { id: 6, make: "Citroen", model: "Jumper", type: "econom" },
  { id: 7, make: "Mercedes", model: "Vito", type: "econom" },
  { id: 8, make: "Mercedes", model: "Viano", type: "econom" },
  { id: 9, make: "Ford", model: "Transporter", type: "luxury" },
  {
    id: 10,
    make: "Ford",
    model: "Tourneo",
    type: "econom",
  },
];

export const handlers = [
  http.get("/api/vans", async ({ request }) => {
    await delay(500);

    // Construct a URL instance out of the intercepted request.
    const url = new URL(request.url);

    const type = url.searchParams.get("type");
    const make = url.searchParams.get("make");

    // Filter vans based on query parameters
    let filteredVans = vans;
    if (type) {
      filteredVans = filteredVans.filter((van) => van.type === type);
    }
    if (make) {
      filteredVans = filteredVans.filter((van) => van.make === make);
    }

    if (filteredVans.length === 0) {
      return HttpResponse.json(
        { message: "No vans found" },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(filteredVans);
  }),

  http.get("/api/vans/:vanId", (req) => {
    const { vanId } = req.params;

    const van = vans.find((van) => van.id === +vanId);

    if (van) {
      return HttpResponse.json(van);
    }
  }),

  http.get("/api/host/vans", async () => {
    const threeVans = vans.slice(0, 3);

    await delay(500);

    return HttpResponse.json(threeVans);
  }),

  http.get("/api/host/vans/:vanId", async (req) => {
    const { vanId } = req.params;

    const van = vans.find((van) => van.id === +vanId);

    if (van) {
      await delay(500);
      return HttpResponse.json(van);
    }

    return HttpResponse.json(
      { message: "Van not found" },
      {
        status: 404,
      }
    );
  }),
];
