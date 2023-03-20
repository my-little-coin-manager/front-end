import React, { useMemo, useRef, useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { coinMarkets } from "recoil/atoms";
import { portfolio } from "recoil/atoms";
import axios from "axios";

const PortfolioPost = () => {
  const market = useRecoilValue(coinMarkets);
  const [history, setHistory] = useRecoilState(portfolio);

  const [search, setSearch] = useState("");
  const [portforlio, setPortfolio] = useState({ transaction: "", price: 0, qty: 0 });

  const searchValue = useRef<any>("");

  const searchCoin = (e: any) => {
    setSearch(e.target.value);
  };

  const portfolioInfo = (e: any) => {
    const { name, value } = e.target;
    setPortfolio((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  console.log(portforlio);
  console.log(search);
  console.log(history);

  const postPortfolio = async (portforlio: any) => {
    const history = { ...portforlio, market: search };
    const response = await axios.post(
      process.env.REACT_APP_API_URL + "/history",
      { history: history },
      {
        headers: { Authorization: `Bearer ${localStorage.token}` }
      }
    );
    setHistory((prevState: any) => {
      return [...prevState, response.data];
    });
    console.log(response);
  };

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    postPortfolio(portforlio);
  };

  const searchMarket = search.length > 0 && market.filter((ele) => ele.korean_name.includes(search));

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <button type="button" name="transaction" value="buy" onClick={portfolioInfo}>
          매수
        </button>
        <button type="button" name="transaction" value="sell" onClick={portfolioInfo}>
          매도
        </button>
      </div>

      <div>
        <label>종목</label>
        <input
          onChange={(e) => {
            searchCoin(e);
          }}
          ref={searchValue}
          value={searchValue.current.value || ""}
          type="text"
          name="market"
        />
        {searchMarket &&
          searchMarket.map((ele: any) => {
            return (
              <span
                key={ele.market}
                onClick={() => {
                  searchValue.current.value = ele.korean_name;
                  setSearch(ele.market);
                }}
              >
                {ele.korean_name}
              </span>
            );
          })}
      </div>
      <div>
        <label>수랑</label>
        <input type="number" name="qty" onChange={portfolioInfo} />
      </div>
      <div>
        <label>금액</label>
        <input type="number" step="0.000001" name="price" onChange={portfolioInfo} />
      </div>
      <div>
        <label>날짜</label>
        <input type="date" step="0.000001" name="date" onChange={portfolioInfo} />
      </div>

      <button type="submit">추가</button>
    </form>
  );
};

export default PortfolioPost;
