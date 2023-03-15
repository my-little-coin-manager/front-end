import React from "react";
import CoinTicker from "./components/CoinTicker/CoinTicker";
import CoinDetail from "./components/CoinDetail/CoinDetail";
import Header from "components/Header/Header";
import styled from "styled-components";

function App() {
  return (
    <>
      <Header />
      <Container>
        <CoinDetail />
        <CoinTicker />
      </Container>
    </>
  );
}

const Container = styled.div`
  background-color: #e9ecf1;
  height: 100vh;
  padding: 0 10%;
  display: flex;
`;

export default App;
