import { createGlobalStyle } from 'styled-components';
import { lineClamp } from '../../../theme';

/**
 * map plugin ovverides
 */

export default createGlobalStyle` 
  
    .leaflet-container {
        font-family: inherit!important;
        font-size: inherit!important;
        z-index: var(--z-index-map)!important;
    }

    .leaflet-marker-icon {
        background: none!important; /** library default marker div */
        border: none!important;
        width: 2.25em!important;
        height: 2.25em!important;
        color: inherit!important;
        &.js-is-selected {
            z-index: var(--z-index-map-selected-marker)!important;
        }
    }

    .leaflet-right {
        right: calc(var(--space-unit) / 1.5)!important;
    }

    
    .leaflet-tile-pane {
        /* filter: grayscale(1) brightness(0.9); */
    }

    .map-popup-image img { 
        width: 80px;
        height: 80px;
        object-fit: cover;
        display: block;
        border-radius: 8px!important;
        border: 0px solid var(--color-text-light-accent);
        background: var(--color-background-light);
    }

    .map-marker { /** my custom marker */
        display: flex!important;
        align-items: center!important;
        justify-content: center!important;
        width: 100%!important;
        height: 100%!important;
        border-radius: 50%!important;
        border: 4px solid var(--color-text-light-accent)!important;
        box-shadow:-5px 0px 0px rgba(0,0,0,0.25)!important;
        background: var(--color-map-marker-background)!important;
        will-change: transform;
        transition: transform 0.2s ease-in;
        img {
            width: 1em!important;
            height: 1em!important;
            filter: invert(1);
        }
        :hover,
        .js-is-selected & {
            background: var(--color-primary)!important;
            border: 4px solid var(--color-text-light-accent)!important;
            img {
             filter: none;
            }
        }
        transition: all 0.2s linear;
    }

    .leaflet-popup-pane {
        transform: translateX(15px);
    }

    .leaflet-popup-content-wrapper { /** library default popup div */
        background: var(--color-background)!important;
        box-shadow: none!important;
        border-radius: 12px!important;
        filter: drop-shadow(-5px 0px 20px var(--drop-shadow-color));
        padding: 16px!important;
    }

    .leaflet-popup-content[style] {
        margin: 0px!important;
        width: auto!important;
    }

    .leaflet-popup-close-button {
        box-shadow: none!important;
        top: 8px!important;
        right: 8px!important;
        color: var(--color-text-light-accent)!important;
    }

    .map-popup { /** my custom popup */
        display: flex;
        color: inherit!important;
        text-decoration: none!important;
        box-shadow: none!important;
    }

    .leaflet-popup-tip {
        background: var(--color-background)!important;
    }

    .map-popup-image { 
        margin-right: 16px;
    }

    .map-popup-info { 
        height: 80px;
        width: 200px;
    }

   .map-popup-date { 
        color: var(--color-text)!important;
        font-variant: small-caps;
        font-size: var(--font-size-x-small);
        margin-bottom: 0.3em;
    }

   .map-popup-title { 
        color: var(--color-text-light-accent)!important;
        font-weight: 700;
        font-size: var(--font-size-small);
        letter-spacing: var(--text-letter-spacing);
        line-height: 1.2;
        ${lineClamp(3)};
    }
`;
