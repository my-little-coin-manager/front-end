import React from "react";
import CoinTicker from "./components/CoinTicker/CoinTicker";
import CoinDetail from "./components/CoinDetail/CoinDetail";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <CoinDetail />
      {/* <BookMarker /> */}
      <CoinTicker />
    </Container>
  );
}

const Container = styled.div`
  background-color: #e9ecf1;
  height: 100vh;
  padding: 0 10%;
  display: flex;
`;

export default App;
