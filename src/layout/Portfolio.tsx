import React, { useState } from "react";
import PortfolioPost from "components/portfolio/postPortfolio/PortfolioPost";
import styled from "styled-components";
import PortfolioList from "../components/portfolio/PortfolioList";

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
