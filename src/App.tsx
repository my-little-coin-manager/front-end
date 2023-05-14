import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import styled from "styled-components";
import GlobalStyle from "style/GlobalStyle";
import Fonts from "style/Fonts";
import CoinList from "components/templates/CoinList";
import CoinDetail from "components/templates/CoinDetail";
import Portfolio from "components/templates/Portfolio";
import Header from "components/templates/Header";

function App() {
  const [componentsControl, setComponentsControl] = useState("detail");
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Fonts />
        <GlobalStyle />
        <Container>
          <Header componentsControl={componentsControl} setComponentsControl={setComponentsControl} />
          <Layout>
            {componentsControl === "detail" && <CoinDetail />}
            {componentsControl === "portfolio" && <Portfolio />}
            <CoinList />
          </Layout>
        </Container>
      </RecoilRoot>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

const Container = styled.div`
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
  padding: 0 10%;
`;

export default App;
