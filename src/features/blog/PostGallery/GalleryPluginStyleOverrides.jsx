import { createGlobalStyle } from 'styled-components';
import { device } from '../../../theme';

/**
 * Library css overrides
 */

export default createGlobalStyle`
    .glightbox-clean .gslide-description {
        background: none!important;
    }
    .glightbox-clean .gslide-title {
        color: var(--color-text-light-accent)!important;
        font-family:  var(--font-family-cursive)!important;
        margin: 0!important;
        @media ${device.onlyTablet} {
            font-size:  var(--font-size-medium)!important;
        }
        @media ${device.desktop} {
            font-size:  var(--font-size-large)!important;
        }
    }
    .glightbox-container .ginner-container.desc-bottom, .glightbox-container .ginner-container.desc-top {
        height: auto!important;
    }

    .glightbox-mobile .glightbox-container .gslide-description {
        position: static!important;
        padding: 0!important;
    }

    .glightbox-clean .gdesc-inner {
        padding: var(--space-unit)!important;
        @media ${device.desktop} {
            padding-left: 0!important;
        }
    }
    .goverlay {
        background: var(--color-background)!important;
    }
    .glightbox-clean .gprev, .glightbox-clean .gnext, .glightbox-clean .gclose {
        border-radius: 0px!important;
    }

    .glightbox-clean .gclose {
        background: none!important;
    }
`;
