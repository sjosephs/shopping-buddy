import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  :root {
  --body-bg: #FFEBCD;
  --header-bg: #201E1D;
  --header-text: #FAB1D9;
  --main-bg: #FFEBCD;
  --main-text: #201E1D;
  --main-title-bg: #FAB1D9;
  --card-bg: #C9F091;
  --card-text: #201E1D;
}
  body {
    margin: 24px;
    margin-bottom: 64px;
    font-family: 'Inter', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;
