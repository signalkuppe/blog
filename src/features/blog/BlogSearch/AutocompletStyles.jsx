import { createGlobalStyle } from 'styled-components';

/**
 * autocomplete plugin ovverides
 */
export default createGlobalStyle` 

    #js-autocomplete {
      opacity: 0;
      width: 100% !important;
      .js-is-loaded & {
          opacity: 1;
      }
    }

    .autoComplete_wrapper {
      width: 100%!important;
      :focus-within svg {
        color:   var(--color-text-light-accent)!important;;
      }
    }

    .autocomplete-search-icon { /* added via js to be able to style it */
      width: 1.4rem;
      height: 1.4rem;
      position: absolute;
      left: 1.05rem;
      top: 0.8rem;
      color: var(--color-text);
    }

    .autoComplete_wrapper > input {
      height: 3rem!important;
      width: 100%!important;
      background-image:none!important;
      border: var(--inputs-border)!important;
      background-color: var(--inputs-background)!important;
      color: var(--inputs-color)!important;
      border-radius: var(--border-radius)!important;
    }

    .autoComplete_wrapper > input:focus {
      border-color:  var(--color-text-light-accent)!important;
    }

    .autoComplete_wrapper > input::placeholder {
      color: var(--color-text-dark-accent)!important;
    }

    .autoComplete_wrapper > input:focus::selection {
      background-color: var(--color-links)!important;
    }

    .autoComplete_wrapper > ul {
      background-color: var(--color-background-light)!important;
      box-shadow: 0 1px 1px var(--drop-shadow-color),
            0 2px 2px var(--drop-shadow-color),
            0 4px 4px var(--drop-shadow-color),
            0 8px 8px var(--drop-shadow-color),
            0 16px 16px var(--drop-shadow-color)!important;
      z-index: var(--z-index-autocomplete)!important;
      border: var(--inputs-border)!important;
      max-height: 50vh!important;
      border-radius: var(--border-radius)!important;
    }


    .autoComplete_wrapper > ul > li {
      color: var(--color-text)!important;
      background-color: var(--color-background-light)!important;
      padding: 0.3rem 0.5rem;
    }

    .autocomplete-results-header{
      padding: 0.3rem 0.5rem;
      margin: 0;
      font-size: var(--font-size-small);
      background-color: var(--color-background)!important;
    }

    .autocomplete-top-row {
      font-weight: 700!important;
      letter-spacing: var(--text-letter-spacing)!important;
    }


    .autoComplete_wrapper > ul > li mark {
      color: var(--color-links)!important;
    }

    .autoComplete_wrapper > ul > li:hover {
      background-color: var(--color-background)!important;
      color: var(--color-text-light-accent)!important;
    }

    .autoComplete_wrapper > ul > li[aria-selected="true"] {
      background-color: var(--color-background)!important;
       color: var(--color-text-light-accent)!important;
    }

    .autocomplete-tags {
      > * + * {
        margin-left: 0.5em;
      }
    }

    .autocomplete-tag {
       font-size: var(--font-size-x-small);
       color: var(--color-text-dark-accent);
    }

`;
