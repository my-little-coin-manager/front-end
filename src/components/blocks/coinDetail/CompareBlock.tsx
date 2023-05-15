import React from "react";
import styled from "styled-components";
import { rateFomater } from "utils/formatNumber";
import { compareFomatter } from "utils/formatNumber";
interface ICompareBlockProps {
  change: string;
  rate: number;
  changePrice: number;
}

const CompareBlock = ({ change, rate, changePrice }: ICompareBlockProps) => {
  return (
    <Container change={change}>
      <Rate>{rateFomater(change, rate)}%</Rate>
      <Compare>{compareFomatter(changePrice, change)}</Compare>
    </Container>
  );
};

export default CompareBlock;

const Container = styled.div<{ change: string }>`
  display: flex;
  color: ${({ change }) => (change === "RISE" ? "red" : change === "FALL" ? "blue" : "black")};
`;

const Rate = styled.p`
  font-weight: 700;
  margin: 0 1rem 0 0;
`;

const Compare = styled.p`
  font-weight: 700;
`;
