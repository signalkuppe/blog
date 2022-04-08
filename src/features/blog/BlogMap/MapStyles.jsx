import { createGlobalStyle } from 'styled-components';
import { lineClamp } from '../../../theme';

/**
 * map plugin ovverides
 */

export default createGlobalStyle` 

    .leaflet-tile-pane {
        filter: grayscale(1);
    }
    .leaflet-container {
        font-family: inherit!important;
        font-size: inherit!important;
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
    .map-marker { /** my custom marker */
        background: var(--color-background)!important;
        display: flex!important;
        align-items: center!important;
        justify-content: center!important;
        width: 100%!important;
        height: 100%!important;
        border-radius: 50%!important;
        border: 2px solid white!important;
        box-shadow:-5px 0px 5px var(--drop-shadow-color)!important;
        img {
            width: 1em!important;
            height: 1em!important;
            filter: invert(1);
        }
        :hover,
        .js-is-selected & {
            background: var(--color-map-active-marker-background)!important;
            color: var(--color-map-active-marker-color)!important;
            transform: scale(1.15);
            
            
        }
        transition: all 0.2s linear;
    }
    .leaflet-popup-content-wrapper { /** library default popup div */
        background: white!important;
        border-radius: 0px!important;
        box-shadow: none!important;
        filter: drop-shadow(-5px 0px 20px var(--drop-shadow-color));
    }

    .leaflet-popup-content[style] {
        margin: 8px!important;
        width: auto!important;
    }

    .leaflet-popup-close-button {
        box-shadow: none!important;
    }

    .map-popup { /** my custom popup */
        display: flex;
        color: inherit!important;
        text-decoration: none!important;
        box-shadow: none!important;
      
    }

    .map-popup-image { 
        width: 80px;
        height: 80px;
        background: #eee;
        margin-right: 8px;
    }

     .map-popup-image img { 
        width: 80px;
        height: 80px;
        object-fit: cover;
        display: block;
    }

    .map-popup-info { 
        height: 80px;
        width: 200px;
    }

   .map-popup-date { 
        text-transform: uppercase;
        font-size: var(--font-size-x-small);
        margin-bottom: 0.25em;
    }

   .map-popup-title { 
        font-weight: 700;
        letter-spacing: var(--text-letter-spacing);
        line-height: 1.2;
        ${lineClamp(3)};
    }
`;
