import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { coinMarkets } from "recoil/atoms";
import { portfolio } from "recoil/atoms";
import axios from "axios";

const PortfolioPost = ({ setHeight }: any) => {
  const market = useRecoilValue(coinMarkets);
  const setHistory = useSetRecoilState(portfolio);
  const [search, setSearch] = useState<any>({ market: "", koreanName: "" });
  const [portforlio, setPortfolio] = useState({ transaction: "", price: 0, qty: 0 });
  const searchValue = useRef<any>("");
  const portRef = useRef<any>(null);

  console.dir(portRef.current);

  const searchCoin = (e: any) => {
    const findMarket = market.find((ele) => ele.korean_name === e.target.value);
    setSearch({ ...search, koreanName: e.target.value, market: findMarket?.market });
  };

  const onChnagePortfolio = (e: any) => {
    const { name, value } = e.target;
    setPortfolio((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const postPortfolio = async (portforlio: any) => {
    const history = { ...portforlio, ...search };

    if (!history.market) {
      alert("코인이름을 입력해주세요.");
      throw new Error("코인이름을 입력해주세요.");
    } else if (!history.qty) {
      alert("수량을 입력해주세요.");
      throw new Error("수량을 입력해주세요.");
    } else if (!history.price) {
      alert("금액을 입력해주세요.");
      throw new Error("금액을 입력해주세요.");
    } else if (!history.date) {
      alert("날짜를 선택해주세요.");
      throw new Error("날짜를 선택해 주세요.");
    } else if (!history.transaction) {
      alert("매수/매도를 선택해주세요.");
      throw new Error("매수/매도를 선택해 주세요.");
    }

    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/history",
      { history },
      {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      }
    );

    setHistory((prevState: any) => {
      return [...prevState, response.data];
    });
  };

  const onSubmitPortfolio = (e: any) => {
    e.preventDefault();
    postPortfolio(portforlio);
  };

  const searchMarket =
    search.koreanName.length > 0 && market.filter((ele) => ele.korean_name.includes(search.koreanName));

  useEffect(() => {
    setHeight(portRef.current.clientHeight);
  }, [search]);

  return (
    <PostPortfolioContainer onSubmit={onSubmitPortfolio} ref={portRef}>
      <InputContainer>
        <div>
          <UserInput
            onChange={(e) => {
              searchCoin(e);
            }}
            ref={searchValue}
            placeholder="종목"
            value={searchValue.current.value || ""}
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
      <CoinSelect>
        {searchMarket &&
          searchMarket.map((ele: any) => {
            return (
              <span
                key={ele.market}
                onClick={() => {
                  searchValue.current.value = ele.korean_name;
                  setSearch({ market: ele.market, koreanName: ele.korean_name });
                }}
              >
                {ele.korean_name}
              </span>
            );
          })}
      </CoinSelect>
      <BtnContainer>
        <div>
          <BuyBtn
            type="button"
            name="transaction"
            value="buy"
            onClick={onChnagePortfolio}
            transaction={portforlio.transaction}
          >
            매수
          </BuyBtn>
          <SellBtn
            type="button"
            name="transaction"
            value="sell"
            onClick={onChnagePortfolio}
            transaction={portforlio.transaction}
          >
            매도
          </SellBtn>
        </div>
        <Btn type="submit">포트폴리오 추가</Btn>
      </BtnContainer>
    </PostPortfolioContainer>
  );
};

export default forwardRef(PortfolioPost);

const PostPortfolioContainer = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 12%;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  margin-bottom: 1rem;
  padding: 2rem 1rem;
`;

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

const CoinSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 5px;

  & span {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1.5px solid #e5e7eb;
    padding: 0.75rem 1rem;
    font-size: 12px;
    color: #808080;

    :hover {
      cursor: pointer;
      border: 1.5px solid #3d6bfb;
      color: #333;
    }
  }
`;
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
