import { Router } from "express";
import { subMonths, startOfMonth, endOfMonth, isSameMonth } from "date-fns";

import UserQueries from "./models/UserQueries";

import { covid } from "./services/api";

const routes = new Router();

routes.get("/summary", async (request, response) => {
  const rightNow = new Date();
  const lastSixMonths = subMonths(rightNow, 6);

  const { country } = request.query;

  if (!country)
    return response.status(400).json({ error: "Country is required." });

  const { data } = await covid.get(
    `country/${country}?from=${lastSixMonths}&to=${rightNow}`
  );

  return response.json(data);
});

routes.post("/summary_last_month", async (request, response) => {
  const rightNow = new Date();
  const lastMonth = subMonths(rightNow, 1);
  const startOfLastMonthDate = startOfMonth(lastMonth);
  const endOfLastMonthDate = endOfMonth(lastMonth);

  const { country } = request.query;

  if (!country)
    return response.status(400).json({ error: "Country is required." });

  const { user_location } = request.query;

  const { data } = await covid.get(
    `country/${country}?from=${startOfLastMonthDate}&to=${endOfLastMonthDate}`
  );

  const highestCases = [];

  data.forEach((covidApiItem) => {
    const { ID, Confirmed, Deaths, Lat, Lon, Date: date } = covidApiItem;

    // Verificar se realmente os dados retornados da API são do mês passado
    // pois aparentemente a API está retornando algumas datas erradas.
    const sameMonth = isSameMonth(lastMonth, new Date(date));

    if (sameMonth && Confirmed > 200000 && Deaths > 100000) {
      highestCases.push({
        covid_api_id: ID,
        covid_confirmed: Confirmed,
        covid_deaths: Deaths,
        covid_location: `${Lat}, ${Lon}`,
        user_location,
        date,
        consulted_at: rightNow,
      });
    }
  });

  await UserQueries.create(highestCases);

  return response.json(highestCases);
});

export default routes;
