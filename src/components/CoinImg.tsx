import React from "react";

interface IProps {
  coinImg: string;
}

const CoinImg = ({ coinImg }: IProps) => {
  return <img src={`https://static.upbit.com/logos/${coinImg}.png`} alt="" />;
};

export default CoinImg;
