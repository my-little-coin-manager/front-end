import React from "react";
import styled from "styled-components";

type SearchMarket = { market: string; korean_name: string; english_name: string };

interface ISearch {
  market: string | undefined;
  koreanName: string;
}

interface IProps {
  search: ISearch;
  market: any;
  searchValue: React.RefObject<HTMLInputElement>;
  setSearch: React.Dispatch<React.SetStateAction<ISearch>>;
}

const SearchResultBlock = ({ search, market, searchValue, setSearch }: IProps) => {
  const searchMarket =
    search.koreanName.length > 0 && market.filter((ele: any) => ele.korean_name.includes(search.koreanName));

  return (
    <CoinSelect>
      {searchMarket &&
        searchMarket.map((ele: SearchMarket) => {
          return (
            <span
              key={ele.market}
              onClick={() => {
                searchValue?.current && (searchValue.current.value = ele.korean_name);
                setSearch({ market: ele.market, koreanName: ele.korean_name });
              }}
            >
              {ele.korean_name}
            </span>
          );
        })}
    </CoinSelect>
  );
};

export default SearchResultBlock;

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
