import { createGlobalStyle } from 'styled-components';
import { device } from '../../../theme';

/**
 * autocomplete plugin ovverides
 */
export default TooltipStyles = createGlobalStyle` 
  .tippy-box {
    background: var(--color-secondary)!important;
    @media ${device.desktop} {
      display: none!important;
    }
  }
  .tippy-arrow {
    color: var(--color-secondary)!important;
  }
`;
