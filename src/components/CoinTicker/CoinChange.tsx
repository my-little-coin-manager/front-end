import React, { useMemo } from "react";
import styled from "styled-components";

const CoinChange = ({ change, rate, price }: any) => {
  const changeRate = useMemo(() => {
    return (rate * 100).toFixed(2);
  }, [rate]);

  const changePrice = useMemo(() => {
    return price.toLocaleString("ko-KR");
  }, [price]);

  return (
    <ChangedCoin change={change}>
      <p>{changeRate}%</p>
      <p>{changePrice}</p>
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
