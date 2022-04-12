import { createGlobalStyle } from 'styled-components';

const PrintStyles = createGlobalStyle`
  @media print {
    * {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"!important;
      color: black!important;
      background: white!important;
      letter-spacing:normal!important;
    }
    body {
      font-size: 10pt!important;
      margin: 1cm;
      
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
    .print-layout-header,
    .print-post-scrollHint,
    .print-post-cover,
    .print-post-menu,
    .print-post-category,
    .print-post-section-foto,
    .print-post-section-mappa,
    .print-post-section-condividi,
    .print-post-nav,
    .print-post-description {
      display: none!important;
    }

    .print-post-hero {
      height: auto!important;
    }

    .print-post-heroSpacer {
      margin: 0!important;
    }

     .print-post-date {
      font-size: 8pt!important;
    }


    .print-post-title {
      font-size: 16pt!important;
      margin-bottom: 24pt!important;
    }

    .print-post-section-relazione,
    .print-post-sections-wrapper,
    .print-container {
      padding: 0!important;
      margin: 0!important;
    }

    .print-post-body {
      max-width: 1000000px!important;
      h3 {
        font-size: 12pt!important;
      }
      figure {
        display: none!important;
      }

      p {
        margin-bottom:5pt!important ;
      }
    }

    .print-post-thanks {
      display:block!important;
      font-weight: 700;
      margin-top: 20pt;
    }
    
  }
`;

export default PrintStyles;
