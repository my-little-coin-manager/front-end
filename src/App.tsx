import React, { useState } from "react";
import CoinTicker from "./components/CoinTicker/CoinTicker";
import CoinDetail from "./components/CoinDetail/CoinDetail";
import Portfolio from "components/portfolio/Portfolio";
import Header from "components/Header/Header";
import styled from "styled-components";

function App() {
  const [componentsControl, setComponentsControl] = useState("detail");
  return (
    <>
      <Header componentsControl={componentsControl} setComponentsControl={setComponentsControl} />
      <Container>
        {componentsControl === "detail" && <CoinDetail />}
        {componentsControl === "portfolio" && <Portfolio />}
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
