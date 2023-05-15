import React from "react";
import styled from "styled-components";

interface ChangeProps {
  change: string;
  rate: number;
  price: number;
}

const CoinCompare = ({ change, rate, price }: ChangeProps) => {
  return (
    <ChangedCoin change={change}>
      {change === "RISE" && <p>+{(rate * 100).toFixed(2)}%</p>}
      {change === "FALL" && <p>{(rate * 100).toFixed(2)}%</p>}
      <p>{price.toLocaleString("ko-KR")}</p>
    </ChangedCoin>
  );
};

const ChangedCoin = styled.span<{ change: string }>`
  width: 25%;
  text-align: right;
  font-size: 12px;
  & p {
    color: ${({ change }) => (change === "RISE" ? "#c84a31" : change === "FALL" ? "#1261c4" : "#333")};
    margin: 0;
  }
`;

export default CoinCompare;
