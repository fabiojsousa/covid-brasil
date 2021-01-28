import { createGlobalStyle } from "styled-components";

import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    body {
        background: #e5e6F0;
        -webkit-font-smoothing: antialiased;
    }

    #root, body, input {
      font: 15px 'Roboto', sans-serif;
    }

    button {
        cursor: pointer;
    }

    a {
        text-decoration: none;
    }

    .Toastify__toast-container--top-center .Toastify__toast-body {
        text-align: center;
    }
`;
