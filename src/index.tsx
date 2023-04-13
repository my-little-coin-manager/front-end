import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";
import GlobalStyle from "style/GlobalStyle";
import Fonts from "style/Fonts";
import App from "./App";
import "./index.css";

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
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>
);
