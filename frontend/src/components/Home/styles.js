import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  header {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    justify-content: center;
    align-items: center;

    img {
      width: 300px;
      margin-bottom: 20px;
    }
  }

  main {
    display: flex;
    font-size: 12px;
    justify-content: space-around;
    align-items: center;
    margin-top: 25px;

    a {
      padding: 10px;
      background-color: darkblue;
      color: #fff;
      border-radius: 25px;
      font-size: 15px;
      margin-right: 10px;
      box-shadow: 2px 2px 6px 1px darkgray;

      &:hover {
        background-color: blue;
      }
    }
  }
`;
