import React from "react";
import styled from "styled-components";

const CoinChange = ({ change, rate, price }: any) => {
  return (
    <ChangedCoin change={change}>
      <p>{(rate * 100).toFixed(2)}%</p>
      <p>{price.toLocaleString("ko-KR")}</p>
    </ChangedCoin>
  );
};

const ChangedCoin = styled.td<{ change: string }>`
  width: 25%;
  text-align: right;
  font-size: 12px;
  & p {
    color: ${({ change }) => (change === "RISE" ? "#c84a31" : change === "FALL" ? "#1261c4" : "#333")};
    margin: 0;
  }
`;

export default CoinChange;
