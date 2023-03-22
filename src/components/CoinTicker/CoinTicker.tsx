import React from "react";
import styled from "styled-components";
import CoinListItem from "./CoinListItem";
import useGetCoins from "hooks/useGetCoins";
import { ticker } from "types/types";
import { useRecoilState, useRecoilValue } from "recoil";
import { menuSelect, userBookmark } from "recoil/atoms";
import { ReactComponent as Exclamation } from "../../asset/svg/exclamation.svg";

const CoinTicker = () => {
  const users = useRecoilValue(userBookmark);
  const [select, setSelect] = useRecoilState(menuSelect);
  const { coinMarketList, coinTicker } = useGetCoins();
  const filterBookmark = Object.values(coinTicker).filter((x: any) => users.includes(x.code));
  const test = coinMarketList.filter((x: any) => users.includes(x.market));

  const selectMenu = (e: any) => {
    e.target.id === "all" ? setSelect("all") : setSelect("bookmark");
  };

  return (
    <CoinTickerContainer>
      <SelectMenu color={select}>
        <p onClick={selectMenu} id={"all"}>
          전체코인
        </p>
        <p onClick={selectMenu} id={"bookmark"}>
          북마크
        </p>
      </SelectMenu>

      <ul>
        <ListHead>
          <p>한글명</p>
          <p>현재가</p>
          <p>전일대비</p>
          <p>거래대금</p>
        </ListHead>
        {select === "all" &&
          Object.values<ticker>(coinTicker).map((ele, idx: number) => {
            return <CoinListItem key={ele.code} item={ele} coinMarkets={coinMarketList[idx]} />;
          })}
        {select === "bookmark" &&
          filterBookmark.map((ele: any, idx: number) => {
            return <CoinListItem key={ele.code} item={ele} coinMarkets={test[idx]} />;
          })}
        {select === "bookmark" && !filterBookmark.length && !!localStorage.getItem("token") && (
          <NoResultMsg>
            <Exclamation />
            <p>아직 북마크에 담긴 코인이 없어요.</p>
          </NoResultMsg>
        )}
        {select === "bookmark" && !filterBookmark.length && !localStorage.getItem("token") && (
          <NoResultMsg>
            <Exclamation />
            <p>로그인 후 이용해 주세요.</p>
          </NoResultMsg>
        )}
      </ul>
    </CoinTickerContainer>
  );
};

const CoinTickerContainer = styled.aside`
  border-radius: 1rem;
  background-color: #fff;
  box-shadow: 0.25rem 0.25rem 0.5rem rgb(0 0 0 / 12%);
  width: 33%;
  overflow-y: scroll;

  & ul {
    margin: 0;
    padding: 0;
  }
  & ul li:not(:last-child) {
    border-bottom: solid 1px #d6d6d6;
  }

  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 90%;
    border-radius: 0.4rem;
    background: rgba(255, 255, 255, 0.4);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.4rem;
    width: 0.5rem;
    height: 0.5rem;
    padding: 10px;
  }
`;

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

// 북마크 포트폴리오 메뉴선택 블럭
const SelectMenu = styled.div`
  height: 3rem;
  display: flex;
  justify-content: center;

  & p:first-child {
    margin: auto 3.5rem;
    color: ${(props) => (props.color === "all" ? "#2196F3" : "black")};
    border-bottom: ${(props) => (props.color === "all" ? "3px solid #2196F3" : "3px solid rgba(0,0,0,0)")};

    &:hover {
      cursor: pointer;
      color: #2196f3;
    }
  }

  & p:last-child {
    margin: auto 3.5rem;
    color: ${(props) => (props.color === "bookmark" ? "#2196F3" : "black")};
    border-bottom: ${(props) => (props.color === "bookmark" ? "3px solid #2196F3" : "3px solid rgba(0,0,0,0)")};

    &:hover {
      cursor: pointer;
      color: #2196f3;
    }
  }
`;

const NoResultMsg = styled.div`
  text-align: center;
  margin-top: 8rem;

  & p {
    margin-top: 1rem;
    color: #c0c0c0;
  }
`;

export default CoinTicker;
