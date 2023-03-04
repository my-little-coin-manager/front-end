import React from "react";
import CoinTicker from "./components/CoinTicker/CoinTicker";
import CoinDetail from "./components/CoinDetail/CoinDetail";
// import BookMarker from "./components/Bookmarker/BookMarker";
import CoinChart from "components/Chart/CoinChart";
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
  height: 100vh;
  border: 1px solid red;
  padding: 0 10%;
  display: flex;
`;

export default App;
