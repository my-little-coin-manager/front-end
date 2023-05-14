import React from "react";
import styled from "styled-components";
import PortfolioListHeader from "components/container/portfolioList/PortfolioListHeader";
import PortfolioListBody from "components/container/portfolioList/PortfolioListBody";

type Height = {
  height: number;
};

const PortfolioList = ({ height }: Height) => {
  return (
    <PortfolioListContainer height={height}>
      <PortfolioListHeader />
      <PortfolioListBody />
    </PortfolioListContainer>
  );
};

export default PortfolioList;

const PortfolioListContainer = styled.ul<{ height: number }>`
  overflow: overlay;
  overflow-x: hidden;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  padding-bottom: 2rem;
  height: ${({ height }) => `calc(100% - (${height}px + 3rem))`};

  &::-webkit-scrollbar {
    width: 0.5rem;
    border-radius: 0.4rem;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    z-index: 999999;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.4rem;
    width: 0.5rem;
    height: 0.5rem;
    padding: 10px;
  }
`;
