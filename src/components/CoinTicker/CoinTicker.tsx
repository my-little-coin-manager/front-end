import axios from "axios";
import React from "react";

const CoinTicker = () => {
  const getConinTicker = async () => {
    const config = { params: { isDeatils: true } };
    const response = await axios.get("https://api.upbit.com/v1/market/all", config);
    console.log(response);
  };

  getConinTicker();

  return <div></div>;
};

export default CoinTicker;
