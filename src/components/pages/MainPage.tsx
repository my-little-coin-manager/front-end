import React, { useState } from "react";
import styled from "styled-components";
import CoinList from "components/templates/CoinList";
import CoinDetail from "components/templates/CoinDetail";
import Portfolio from "components/templates/Portfolio";
import Header from "components/templates/Header";

const MainPage = () => {
  const [componentsControl, setComponentsControl] = useState("detail");

  return (
    <MainPageContainer>
      <Header componentsControl={componentsControl} setComponentsControl={setComponentsControl} />
      <Layout>
        {componentsControl === "detail" && <CoinDetail />}
        {componentsControl === "portfolio" && <Portfolio />}
        <CoinList />
      </Layout>
    </MainPageContainer>
  );
};

export default MainPage;

const MainPageContainer = styled.div`
  background-color: #e9ecf1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Layout = styled.div`
  height: 80%;
  max-height: 80%;
  margin: 3rem auto;
  display: flex;
  justify-content: space-between;
`;
