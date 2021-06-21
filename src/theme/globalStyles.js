import { createGlobalStyle, css } from 'styled-components';
import { vars, getVar, device } from './';

const rootVars = css`
    ${vars}
`;

const GlobalStyles = createGlobalStyle`

  @font-face {
    font-family: "Roboto Flex";
	  src: url('/fonts/roboto-flex.woff2') format('woff2 supports variations'),
		   url('/fonts/roboto-flex.woff2') format('woff2-variations');
  font-weight: 100 1000;
	font-stretch: 25% 151%;
  }

  @font-face {
    font-family:  ${getVar('--font-family-cursive')};
    font-display: swap;
    src: url('/fonts/sriracha.woff2') format('woff2');
  }

  :root {
    ${rootVars};
    font-size: 100%;
  }

  @media ${device.desktop} {
    :root {
    font-size: 112.5%;
    }
    
  }


  * {
    box-sizing: border-box;
  }

  html {
    line-height: 1.15; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  body {
    font-family:  ${getVar('--font-family-base')};
    color: ${getVar('--color-text')};
    background: ${getVar('--color-background')};
    margin: 0;
    padding: 0;
  }

  h1 {
    font-family: "Roboto Flex", sans-serif;
    font-variation-settings: 'wdth' 50, 'slnt' 0, 'GRAD' 0, 'wght': 500;
  }

  main {
    display: block;
  }

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
    border-style: solid;
    border-color: #eee;
    border-width: 1px;
  }
  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }
  a {
    background-color: transparent;
    color: ${getVar('--color-primary')};
    text-decoration: none;
  }
  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }
  b,
  strong {
    font-weight: 700;
    color:${getVar('--color-text-light-accent')};
  }
  i,
  em {
    font-family:  ${getVar('--font-family-cursive')};
    color:  ${getVar('--color-text-light-accent')};
  }
  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  img {
    border-style: none;
    max-width: 100%;
    height: auto;
  }
  figure {
    margin: 0;
  }
  figcaption {
    font-style: italic;
  }
  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }
  button,
  input { /* 1 */
    overflow: visible;
  }
  button,
  select { /* 1 */
    text-transform: none;
  }
  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }
  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }
  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }
  progress {
    vertical-align: baseline;
  }
  textarea {
    overflow: auto;
  }
  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }
  details {
    display: block;
  }
  summary {
    display: list-item;
  }
  template {
    display: none;
  }
  [hidden] {
    display: none;
  }
`;

export default GlobalStyles;
