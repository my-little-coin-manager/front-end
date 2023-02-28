import React from "react";
import CoinTicker from "./components/CoinTicker/CoinTicker";
import CoinDetail from "./components/CoinDetail/CoinDetail";
// import BookMarker from "./components/Bookmarker/BookMarker";
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
  margin: 0 10%;
  display: flex;
`;

export default App;
