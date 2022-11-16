import { createGlobalStyle, css } from 'styled-components';
import { vars, device } from './';

const rootVars = css`
    ${vars}
`;

const GlobalStyles = createGlobalStyle`

  /**  Start reset */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font: inherit;
    font-size: 100%;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input, button, textarea, select {
    font: inherit;
  }

  a {
    text-decoration: none;
  }


  /** end reset */

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: url('/fonts/inter.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: fallback;
    src: url('/fonts/inter.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Inter Tight';
    font-style: normal;
    font-weight: 900;
    font-display: fallback;
    src: url('/fonts/inter-tight.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  @font-face {
    font-family: 'Sriracha';
    font-style: normal;
    font-weight: 400;
    font-display: fallback;
    src: url('/fonts/sriracha.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  :root {
    ${rootVars};
    font-size: 100%;
    color-scheme: dark;
    scrollbar-gutter: stable;
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
    -webkit-text-size-adjust: 100%; /* 2 */
    scroll-padding-top: calc(var(--space-unit) * 4);
    height: 100%;
  }

  body {
    font-family: var(--font-family-base);
    line-height: 1.8;
    letter-spacing: var(--text-letter-spacing);
    color: var(--color-text);
    background: var(--color-background);
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }

  /**
  * basic html styles for element in components/ui/BasicHtmlStyles
  */
  
`;

export default GlobalStyles;
