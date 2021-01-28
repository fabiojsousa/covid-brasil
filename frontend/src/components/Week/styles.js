import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  header {
    display: flex;
    font-size: 12px;
    justify-content: space-around;
    align-items: center;
    padding: 10px;

    a {
      border-radius: 5px;
      border: 1px solid darkgray;
      box-shadow: 1px 2px 2px 1px darkgray;
      padding: 5px;
    }
  }

  main {
    margin-top: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h2 {
      display: block;
      text-align: center;
      margin-bottom: 20px;
      font-weight: normal;
    }

    div.loading {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      img {
        width: 50px;
      }
    }

    div {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;

      div.covid-case {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: rgb(253, 247, 227);
        padding: 5px;
        border-radius: 5px;
        border: 1px solid darkgray;
        box-shadow: 1px 2px 2px 1px darkgray;
        margin: 0 10px 10px 0;
        text-align: center;
        padding: 10px;

        dt {
          font-weight: bold;
          margin-top: 10px;
        }
      }
    }
  }
`;
