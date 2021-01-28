import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Routes from "./Routes";
import history from "./services/history";
import GlobalStyle from "./styles/global";

function App() {
  return (
    <Router history={history}>
      <Routes />
      <GlobalStyle />
      <ToastContainer autoClose={5000} position="top-center" />
    </Router>
  );
}

export default App;
