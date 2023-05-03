import React from "react";

interface IProps {
  title: string;
}

const CoinTitle = ({ title }: IProps) => {
  return <p>{title}</p>;
};

export default CoinTitle;
