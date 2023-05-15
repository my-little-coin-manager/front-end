import React, { useState } from "react";
import styled from "styled-components";
import PortfolioPost from "components/container/postPortfolio/PortfolioPost";
import PortfolioList from "components/container/portfolioList/PortfolioList";

const Portfolio = () => {
  const [height, setHeight] = useState<number>(165);

  return (
    <PortfoiloContainer>
      <PortfolioPost setHeight={setHeight} />
      <PortfolioList height={height} />
    </PortfoiloContainer>
  );
};

export default Portfolio;

const PortfoiloContainer = styled.div`
  box-sizing: border-box;
  width: 70rem;
  margin-right: 1rem;
`;
