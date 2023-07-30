import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot, useRecoilValue } from "recoil";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { isDarkState } from "./atoms";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>
);
