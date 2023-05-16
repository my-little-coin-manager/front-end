import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import usePostBookmark from "hooks/portfolio/usePostPortfolio";
import useGetMarkets from "hooks/useGetMarkets";
import SearchResultBlock from "../../blocks/postPortfolio/SearchResultBlock";
import BtnBlock from "../../blocks/postPortfolio/BtnBlock";
import InputBlock from "../../blocks/postPortfolio/InputBlock";

interface ISearch {
  market: string | undefined;
  koreanName: string;
}

interface IPortfolio {
  transaction: string;
  price: number;
  qty: number;
  date: string;
}

const PortfolioPostSection = ({ setHeight }: { setHeight: React.Dispatch<React.SetStateAction<number>> }) => {
  const { data: market } = useGetMarkets();
  const { mutate: postPortfolio } = usePostBookmark();
  const [search, setSearch] = useState<ISearch>({ market: "", koreanName: "" });
  const [portforlio, setPortfolio] = useState<IPortfolio>({ transaction: "", price: 0, qty: 0, date: "" });

  const searchValue = useRef<HTMLInputElement>(null);
  const portRef = useRef<HTMLFormElement>(null);

  const onChnagePortfolio = (e: React.ChangeEvent<HTMLInputElement> & React.MouseEvent<HTMLButtonElement>) => {
    const { name, value } = e.target;
    setPortfolio({ ...portforlio, [name]: value });
  };

  const postPortfolioHandelr = async (portforlio: IPortfolio) => {
    const history = { ...portforlio, ...search };

    if (!localStorage.getItem("accessToken")) {
      alert("포트폴리오 기능은 로그인 후 이용할 수 있습니다.");
      throw new Error("포트폴리오 기능은 로그인 후 이용할 수 있습니다.");
    } else if (!history.market) {
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

    postPortfolio(history);
  };

  const onSubmitPortfolio = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postPortfolioHandelr(portforlio);
  };

  useEffect(() => {
    setHeight(portRef?.current?.clientHeight || 0);
  }, [search]);

  return (
    <PortfolioPostSectionContainer onSubmit={onSubmitPortfolio} ref={portRef}>
      <InputBlock
        market={market}
        search={search}
        setSearch={setSearch}
        searchValue={searchValue}
        onChnagePortfolio={onChnagePortfolio}
      />
      <SearchResultBlock search={search} market={market} searchValue={searchValue} setSearch={setSearch} />
      <BtnBlock onChnagePortfolio={onChnagePortfolio} transaction={portforlio.transaction} />
    </PortfolioPostSectionContainer>
  );
};

export default PortfolioPostSection;

const PortfolioPostSectionContainer = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 12%;
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  margin-bottom: 1rem;
  padding: 2rem 1rem;
`;
