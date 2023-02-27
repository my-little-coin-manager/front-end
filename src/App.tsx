import React from "react";
import CoinTicker from "./components/CoinTicker/CoinTicker";
import BookMarker from "./components/Bookmarker/BookMarker";
import styled from "styled-components";

function App() {
  return (
    <Container>
      <BookMarker />
      <CoinTicker />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 10%;
  display: flex;
`;

export default App;
