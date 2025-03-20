import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css"; // index.js에서 global stylesheet을 import하면 전역적으로 스타일 적용
import { ThemeProvider } from "styled-components";
import theme from "./styles/theme";
import GlobalStyle from "./styles/GlobalStyle";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 전역 스타일 관련 코드들은 컴포넌트가 렌더링되기 전에 최상위 수준에서 처리되도록 index.js에서 로드하는 것이 좋음 */}
    {/* ThemeProvider를 사용하면 styled-components 내에서 props.theme을 통해 저장된 스타일 정보를 넘겨 받아 간단하게 일관된 스타일을 적용 */}
    <ThemeProvider theme={theme}>
      {/* Styled-components에서는 createGlobalStyle 함수로 생성된 GlobalStyle 컴포넌트를 통해 전역적으로 CSS를 적용 */}
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
