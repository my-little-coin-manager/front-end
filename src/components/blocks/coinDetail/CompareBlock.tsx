import React from "react";
import styled from "styled-components";
import { priceFomatter } from "utils/formatNumber";
import { rateFommater } from "utils/formatNumber";

interface ICompareBlockProps {
  change: string;
  rate: number;
  changePrice: number;
}

const CompareBlock = ({ change, rate, changePrice }: ICompareBlockProps) => {
  return (
    <Container change={change}>
      <Rate>전일대비 {rateFommater(change, rate)}%</Rate>
      <Compare>{priceFomatter(changePrice)} KRW</Compare>
    </Container>
  );
};

export default CompareBlock;

const Container = styled.div<{ change: string }>`
  display: flex;
  justify-content: space-between;
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
`;

const Compare = styled.p``;

const Rate = styled.p``;
