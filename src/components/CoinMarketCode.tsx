import React from "react";

interface IProps {
  marketCode: string;
}

const CoinMarketCode = ({ marketCode }: IProps) => {
  return <h4>{marketCode}</h4>;
};

export default CoinMarketCode;
