import React from "react";
import styled from "styled-components";

const PortfolioListHeader = () => {
  return (
    <PortfolioListHeaderContainer>
      <Division>종목</Division>
      <Division>손익률</Division>
      <Division>평가손익</Division>
      <Division>매입금</Division>
      <Division>현재가</Division>
      <Division>평가금</Division>
      <Division>평균단가</Division>
      <Division>보유수량</Division>
    </PortfolioListHeaderContainer>
  );
};

export default PortfolioListHeader;

const PortfolioListHeaderContainer = styled.li`
  text-decoration: none;
  display: flex;
  font-size: 0.8rem;

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

const Division = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% / 8);
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
