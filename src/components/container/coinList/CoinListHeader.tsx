import React from "react";
import styled from "styled-components";

const CoinListHeader = () => {
  return (
    <ListHead>
      <p>한글명</p>
      <p>현재가</p>
      <p>전일대비</p>
      <p>거래대금</p>
    </ListHead>
  );
};

export default CoinListHeader;

const ListHead = styled.li`
  position: sticky;
  top: 0;
  height: 40px;
  color: #666;
  font-size: 12px;
  background-color: #f9fafc;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & p {
    width: 25%;
    text-align: center;

    :first-child {
      margin-left: 5%;
    }

    :last-child {
      margin-right: 5%;
    }
  }
`;
