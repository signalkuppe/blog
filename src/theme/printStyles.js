import { createGlobalStyle } from 'styled-components';

const PrintStyles = createGlobalStyle`
  @media print {
    * {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"!important;
      color: black!important;
      background: white!important;
    }
    body {
      font-size: 10pt!important;
    }
    h1 {
      font-size: 32pt!important;
    }

    h2 {
      font-size: 24pt!important;
    }

    h3 {
      font-size: 16pt!important;
    }
  }
`;

export default PrintStyles;
