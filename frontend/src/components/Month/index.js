import React, { useState } from "react";
import { subMonths, format, endOfMonth, startOfMonth } from "date-fns";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Container } from "./styles";

import { api, apiGeocode } from "../../services/api";

import loading from "../../assets/loading.gif";

function Month() {
  const [covidHighestCases, setCovidHighestCases] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [currentUserLocation, setCurrentuserLocation] = useState("");

  const lastMonth = subMonths(new Date(), 1);
  const startOfLastMonthDate = startOfMonth(lastMonth);
  const endofLastMonthDate = endOfMonth(lastMonth);

  function loadCovidCases() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async ({ coords }) => {
        const { latitude, longitude } = coords;

        setApiLoading(true);
        setCovidHighestCases([]);

        try {
          const { data } = await api.post(
            `summary_last_month?country=brazil&user_location=${latitude},${longitude}`
          );

          const userLocation = await reverseGeoCode(`${latitude},${longitude}`);

          setCurrentuserLocation(userLocation);

          await Promise.all(
            data.map(async (item, index) => {
              const { covid_location } = item;

              const state = await reverseGeoCode(covid_location);

              data[index].state = state;
            })
          );

          setApiLoading(false);

          setCovidHighestCases(data);
          toast.success(
            `Essa consulta gravou ${data.length} itens no banco de dados!`
          );
        } catch (err) {
          setApiLoading(false);
          toast.error("Algo deu errado.");
        }
      });
    } else {
      toast.error("Localização geográfica não disonível");
    }
  }

  async function reverseGeoCode(latitudeLongitude) {
    const [lat, long] = latitudeLongitude.split(",");

    const { data } = await apiGeocode(
      `reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`
    );

    // Nome do estado brasileiro descoberto por meio da latitude e longitude
    const { countryCode, city, principalSubdivision } = data;

    return `${city} - ${principalSubdivision}, ${countryCode}`;
  }

  return (
    <Container>
      <header>
        <Link to="/">
          <h1>HOME</h1>
        </Link>
      </header>

      <main>
        <h2>
          Maiores Casos de COVID 19 no Brasil no último mês
          <br /> (
          {`${format(startOfLastMonthDate, "dd/MM/yyyy")} - ${format(
            endofLastMonthDate,
            "dd/MM/yyyy"
          )}`}
          )
        </h2>
        <button type="button" onClick={loadCovidCases}>
          Realizar Consulta
        </button>
        {covidHighestCases.length > 0 && (
          <>
            <h2>
              Dados da consulta: {format(new Date(), "dd/MM/yyyy HH:mm:ss")} |{" "}
              {currentUserLocation}
            </h2>
            <strong>
              Para esta consulta foram considerados os lugares com casos
              confirmados maiores que 200000 e mortes maiores que 100000
            </strong>
          </>
        )}
        {apiLoading ? (
          <div className="loading">
            <img src={loading} alt="loading" />
            LOADING...
          </div>
        ) : (
          <div>
            {covidHighestCases.map((covidCase) => (
              <div className="covid-case" key={covidCase.covid_api_id}>
                <dl>
                  <dt>ID</dt>
                  <dd>
                    <small>{covidCase.covid_api_id}</small>
                  </dd>
                  <dt>Localização</dt>
                  <dd>{covidCase.state}</dd>
                  <dt>Casos</dt>
                  <dd>
                    Confirmados: {covidCase.covid_confirmed} | Mortes:{" "}
                    {covidCase.covid_deaths}
                  </dd>
                  <dt>Data</dt>
                  <dd>{format(new Date(covidCase.date), "dd/MM/yyyy")}</dd>
                </dl>
              </div>
            ))}
          </div>
        )}
      </main>
    </Container>
  );
}

export default Month;
