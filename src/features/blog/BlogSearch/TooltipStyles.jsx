import { createGlobalStyle } from 'styled-components';
import { device } from '../../../theme';

/**
 * autocomplete plugin ovverides
 */
export default createGlobalStyle` 
  .tippy-box {
    background: var(--color-button-background)!important;
    color: var(--color-button-color)!important;
    @media ${device.desktop} {
      display: none!important;
    }
  }
  .tippy-arrow {
    color: var(--color-button-background)!important;
  }
`;
