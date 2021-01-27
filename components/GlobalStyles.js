import { createGlobalStyle } from "styled-components";

/**
 * Applies global styles to /pages/_app.js
 *
 * https://www.styled-components.com/docs/api#createglobalstyle
 */
export default createGlobalStyle`
  html {
    overflow: hidden;
  }
  body {
    margin: 0;
  }
  * {
      transition: all 0.2s linear;
      transition-property: color, background-color, border-color;
  }
`;
