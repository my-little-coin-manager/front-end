import React from "react";
import PortfolioPost from "./PortfolioPost";
import styled from "styled-components";
import PortfolioList from "./PortfolioList";

const Portfolio = () => {
  return (
    <PortfoiloContainer>
      <PortfolioPost />
      <PortfolioList />
    </PortfoiloContainer>
  );
};

export default Portfolio;

const PortfoiloContainer = styled.div`
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  width: 70rem;
  height: calc(100vh - 134px);
  margin: 50px 1rem 0 0;
  padding: 1rem;
`;

const History = styled.li`
  text-decoration: none;
  display: flex;
  & p {
    text-align: center;
    width: calc(100% / 8);
  }
`;
