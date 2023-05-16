import React, { useState } from "react";
import styled from "styled-components";
import PortfolioPostSection from "components/container/postPortfolio/PortfolioPostSection";
import PortfolioListSection from "components/container/portfolioList/PortfolioListSection";

const Portfolio = () => {
  const [height, setHeight] = useState<number>(165);

  return (
    <PortfoiloContainer>
      <PortfolioPostSection setHeight={setHeight} />
      <PortfolioListSection height={height} />
    </PortfoiloContainer>
  );
};

export default Portfolio;

const PortfoiloContainer = styled.div`
  box-sizing: border-box;
  width: 70rem;
  margin-right: 1rem;
`;
