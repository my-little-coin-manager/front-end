import React, { useEffect, useRef, useState } from "react";
import PortfolioPost from "./PortfolioPost";
import styled from "styled-components";
import PortfolioList from "./PortfolioList";

const Portfolio = () => {
  const [height, setHeight] = useState(165);

  return (
    <PortfoiloContainer>
      <PortfolioPost setHeight={setHeight} />
      <PortfolioList height={height} />
    </PortfoiloContainer>
  );
};

export default Portfolio;

const PortfoiloContainer = styled.div`
  width: 72rem;
  margin-right: 1rem;

  /* border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  
  padding: 2rem 1rem; */
`;
