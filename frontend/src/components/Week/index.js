import React, { useState, useEffect } from "react";
import { subWeeks, isAfter, format } from "date-fns";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { Container } from "./styles";

import { api } from "../../services/api";

import loading from "../../assets/loading.gif";

function Week() {
  const [covidCases, setCovidCases] = useState([]);
  const [average, setAverage] = useState({
    confirmed: 0,
    deaths: 0,
  });
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    async function loadCovidCases() {
      setApiLoading(true);
      const rightNow = new Date();
      const twoWeeksAgoDate = subWeeks(rightNow, 2);

      try {
        const { data } = await api.get("summary?country=brazil");
        setApiLoading(false);

        const twoWeeksAgoData = [];

        data.forEach((item) => {
          let { Date: itemDate } = item;
          itemDate = new Date(itemDate);

          if (isAfter(itemDate, twoWeeksAgoDate)) twoWeeksAgoData.push(item);
        });

        let confirmedCases = 0;
        let deathCases = 0;

        twoWeeksAgoData.forEach((item) => {
          const { Confirmed, Deaths } = item;

          confirmedCases += Confirmed;
          deathCases += Deaths;
        });

        setAverage({
          confirmed: Number(confirmedCases / 14).toFixed(2),
          deaths: Number(deathCases / 14).toFixed(2),
        });

        setCovidCases(twoWeeksAgoData);
      } catch (err) {
        setApiLoading(false);
        toast.error("Algo deu errado.");
      }
    }

    loadCovidCases();
  }, []);

  return (
    <Container>
      <header>
        <Link to="/">
          <h1>HOME</h1>
        </Link>
      </header>

      <main>
        <h2>
          Casos de COVID 19 no Brasil nas duas últimas semanas<br/> (
          {`${format(subWeeks(new Date(), 2), "dd/MM/yyyy")} - ${format(
            new Date(),
            "dd/MM/yyyy"
          )}`}
          )
        </h2>
        <h2>Média Móvel de casos confirmados: {average.confirmed}</h2>
        <h2>Média Móvel de mortes: {average.deaths}</h2>
        {apiLoading ? (
          <div className="loading">
            <img src={loading} alt="loading" />
            LOADING...
          </div>
        ) : (
          <div>
            {covidCases.map((covidCase) => (
              <div className="covid-case" key={covidCase.ID}>
                <dl>
                  <dt>ID</dt>
                  <dd>
                    <small>{covidCase.ID}</small>
                  </dd>
                  <dt>Casos</dt>
                  <dd>
                    Confirmados: {covidCase.Confirmed} | Mortes:{" "}
                    {covidCase.Deaths}
                  </dd>
                  <dt>Localização</dt>
                  <dd>
                    Latitude: {covidCase.Lat} | Longitude: {covidCase.Lon}
                  </dd>
                  <dt>Data</dt>
                  <dd>{format(new Date(covidCase.Date), "dd/MM/yyyy")}</dd>
                </dl>
              </div>
            ))}
          </div>
        )}
      </main>
    </Container>
  );
}

export default Week;
