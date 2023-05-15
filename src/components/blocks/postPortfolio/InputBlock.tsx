import React from "react";
import styled from "styled-components";

interface ISearch {
  market: string | undefined;
  koreanName: string;
}

interface IProps {
  setSearch: React.Dispatch<React.SetStateAction<ISearch>>;
  market: any;
  search: ISearch;
  searchValue: React.RefObject<HTMLInputElement>;
  onChnagePortfolio: (e: React.ChangeEvent<HTMLInputElement> & React.MouseEvent<HTMLButtonElement>) => void;
}

const InputBlock = ({ setSearch, market, search, searchValue, onChnagePortfolio }: IProps) => {
  const searchCoin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const findMarket = market?.find((ele: any) => ele.korean_name === e.target.value);
    setSearch({ ...search, koreanName: e.target.value, market: findMarket?.market });
  };

  return (
    <InputContainer>
      <div>
        <UserInput
          onChange={(e) => {
            searchCoin(e);
          }}
          ref={searchValue}
          placeholder="종목"
          value={searchValue.current?.value || ""}
          type="text"
          name="market"
        />
        <UserInput placeholder="수량" type="number" name="qty" onChange={onChnagePortfolio} />
      </div>
      <div>
        <UserInput placeholder="금액" type="number" step="0.000001" name="price" onChange={onChnagePortfolio} />
        <UserInput placeholder="날짜" type="date" step="0.000001" name="date" onChange={onChnagePortfolio} />
      </div>
    </InputContainer>
  );
};

export default InputBlock;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & div {
    width: 49.5%;
    display: flex;
    justify-content: space-between;
  }
`;

const UserInput = styled.input`
  border-radius: 5px;
  border: 1.5px solid #e5e7eb;
  padding: 2%;
  margin-bottom: 5px;
  color: #7e7e7e;
  width: 45%;

  :focus {
    outline: none;
  }
`;
