import { HttpResponse, delay, http } from "msw";

const vans = [
  { id: 1, make: "Ford", model: "Transit" },
  {
    id: 2,
    make: "Mercedes",
    model: "Sprinter",
  },
  { id: 3, make: "Volkswagen", model: "Crafter" },
  { id: 4, make: "Renault", model: "Master" },
  {
    id: 5,
    make: "Peugeot",
    model: "Boxer",
  },
];

export const handlers = [
  http.get("/api/vans", () => {
    return HttpResponse.json(vans);
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

    await delay();

    return HttpResponse.json(threeVans);
  }),

  http.get("/api/host/vans/:vanId", async (req) => {
    const { vanId } = req.params;

    const van = vans.find((van) => van.id === +vanId);

    if (van) {
      await delay();
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
