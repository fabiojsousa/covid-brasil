import React from "react";
import { Link } from "react-router-dom";

import { Container } from "./styles";

import covidBanner from "../../assets/covid.jpg";

function Home() {
  return (
    <Container>
      <header>
        <img src={covidBanner} alt="Covid Banner" />
        <h1>Dados de COVID 19 no Brasil</h1>
      </header>
      <main>
        <Link to="/semana">
          Últimas 2 Semanas
        </Link>
        <Link to="/mes">
          Último mês
        </Link>
      </main>
    </Container>
  );
}

export default Home;
