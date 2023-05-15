import React from "react";
import styled from "styled-components";

interface IProps {
  onChnagePortfolio: (e: React.ChangeEvent<HTMLInputElement> & React.MouseEvent<HTMLButtonElement>) => void;
  transaction: string;
}

const BtnBlock = ({ onChnagePortfolio, transaction }: IProps) => {
  return (
    <BtnContainer>
      <div>
        <BuyBtn type="button" name="transaction" value="buy" onClick={onChnagePortfolio} transaction={transaction}>
          매수
        </BuyBtn>
        <SellBtn type="button" name="transaction" value="sell" onClick={onChnagePortfolio} transaction={transaction}>
          매도
        </SellBtn>
      </div>
      <Btn type="submit">포트폴리오 추가</Btn>
    </BtnContainer>
  );
};

export default BtnBlock;

const BtnContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    display: flex;
    justify-content: space-between;
    width: 49.5%;

    & button {
      width: 49%;
    }
  }
`;

const Btn = styled.button`
  width: 49.5%;
  height: 3rem;
  background-color: #1261c4;
  border: none;
  padding: 0;
  border-radius: 5px;
  margin-bottom: 5px;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;

  :hover {
    cursor: pointer;
  }
`;

const BuyBtn = styled(Btn)<{ transaction: string }>`
  border: 1px solid #f14f4f;

  color: ${({ transaction }) => (transaction === "buy" ? "#fff" : "#f14f4f")};
  background-color: ${({ transaction }) => (transaction === "buy" ? "#f14f4f" : "#fff")};
`;

const SellBtn = styled(Btn)<{ transaction: string }>`
  border: 1px solid #3d6bfb;
  color: ${({ transaction }) => (transaction === "sell" ? "#fff" : "#3d6bfb;")};
  background-color: ${({ transaction }) => (transaction === "sell" ? "#3d6bfb" : "#fff")};
`;
