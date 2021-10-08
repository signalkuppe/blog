import { createGlobalStyle } from 'styled-components';

/**
 * autocomplete plugin ovverides
 */
export default AutocompletStyles = createGlobalStyle` 
    .autoComplete_wrapper {
      width: 100%!important;
      max-width: 85ch;
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
      color: var(--color-text)!important;
      border: 0.25em solid var(--color-text)!important;
      background-image:none!important;
      background-color: var(--color-background)!important;
    }

    .autoComplete_wrapper > input:focus {
      border-color:  var(--color-text-light-accent)!important;
    }

    .autoComplete_wrapper > input::placeholder {
      color: var(--color-text-dark-accent)!important;
    }

    .autoComplete_wrapper > input:focus::selection {
      background-color: var(--color-primary)!important;
    }

    .autoComplete_wrapper > ul {
      background-color: var(--color-background-light)!important;
      border: 0.25em solid var(--color-text-light-accent)!important;
      box-shadow:
          0 1px 1px hsl(0deg 0% 0% / 0.075),
          0 2px 2px hsl(0deg 0% 0% / 0.075),
          0 4px 4px hsl(0deg 0% 0% / 0.075),
          0 8px 8px hsl(0deg 0% 0% / 0.075),
          0 16px 16px hsl(0deg 0% 0% / 0.075)!important
      ;
    }

    .autoComplete_wrapper > ul > li {
      color: var(--color-text)!important;
      background-color: var(--color-background-light)!important;
    }

    .autoComplete_wrapper > ul > li mark {
      color: var(--color-primary)!important;
    }

    .autoComplete_wrapper > ul > li:hover {
      background-color: var(--color-background)!important;
      color: var(--color-text-light-accent)!important;
    }

    .autoComplete_wrapper > ul > li[aria-selected="true"] {
      background-color: var(--color-background)!important;
       color: var(--color-text-light-accent)!important;
    }

`;
