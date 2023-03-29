import React from "react";
import GlobalStyle from "style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import "./index.css";
import App from "./App";
import Fonts from "style/Fonts";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(container);
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <Fonts />
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </QueryClientProvider>
);
