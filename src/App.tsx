import React from "react";
import "./App.css";
import CoinTicker from "./components/CoinTicker/CoinTicker";
import BookMarker from "./components/Bookmarker/BookMarker";

function App() {
  return (
    <div className="App">
      <CoinTicker />
      <BookMarker />
    </div>
  );
}

export default App;
