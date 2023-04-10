import React from "react";
import styled from "styled-components";

const PortfolioListHeader = () => {
  return (
    <History>
      <ListHeader>종목</ListHeader>
      <ListHeader>손익률</ListHeader>
      <ListHeader>평가손익</ListHeader>
      <ListHeader>매입금</ListHeader>
      <ListHeader>현재가</ListHeader>
      <ListHeader>평가금</ListHeader>
      <ListHeader>평균단가</ListHeader>
      <ListHeader>보유수량</ListHeader>
    </History>
  );
};

export default PortfolioListHeader;

const History = styled.li`
  text-decoration: none;
  height: 4rem;
  display: flex;
  font-size: 15px;
  :not(:first-child) {
    padding: 0 1rem;
  }

  :first-child {
    position: sticky;
    top: 0;
  }

  :not(:first-child) {
    border-bottom: solid 1px #d6d6d6;
  }
`;

const CoinStock = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 8);
  color: #333;

  :first-child {
    justify-content: left;
  }

  & img {
    width: 25px;
    height: 25px;
    margin: 0 0.5rem;
  }
`;

const ListHeader = styled(CoinStock)`
  height: 3rem;
  background-color: #f9fafc;
  color: #666;
  font-weight: 700;

  :first-child {
    padding-left: 1rem;
    justify-content: center;
  }

  :last-child {
    padding-right: 1rem;
  }
`;
