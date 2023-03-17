import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Portfolio = () => {
  const [history, setHistory] = useState([]);

  const getPortfolio = async () => {
    const getUserPortfolio = await axios.get(process.env.REACT_APP_API_URL + "/history", {
      headers: { Authorization: `Bearer ${localStorage.token}` }
    });
    setHistory(getUserPortfolio.data.result);
  };

  console.log(history);
  useEffect(() => {
    getPortfolio();
  }, []);

  return (
    <PortfoiloContainer>
      <ul>
        <History>
          <p>종목</p>
          <p>기호</p>
          <p>유형</p>
          <p>수량</p>
          <p>평균가격</p>
          <p>현재가격</p>
        </History>
        {history.map((ele: any, idx) => {
          return (
            <History key={ele._id}>
              <p>{ele.history.market}</p>
              <p>{ele.history.transaction}</p>
              <p>{ele.history.price}</p>
              <p>{ele.history.qty}</p>
              <p>{ele.history.date}</p>
            </History>
          );
        })}
      </ul>
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

  & table {
    border-collapse: collapse;
  }
`;

const History = styled.li`
  text-decoration: none;
  display: flex;
  & p {
    margin-left: 10px;
  }
`;
