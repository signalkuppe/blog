import { createGlobalStyle } from 'styled-components';
import { lineClamp } from '../../../theme';

/**
 * map plugin ovverides
 */

export default MapStyles = createGlobalStyle` 
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
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)
        ;
        img {
            width: 1em!important;
            height: 1em!important;
            filter: invert(1);
        }
        :hover,
        .js-is-selected & {
            background: var(--color-primary)!important;
            transform: scale(1.15);
            img {
                filter: invert(0);
            }
            
        }
        transition: all 0.2s linear;
    }
    .leaflet-popup-content-wrapper { /** library default popup div */
        background: white!important;
        border-radius: 0px!important;
        box-shadow:
            0 1px 1px hsl(0deg 0% 0% / 0.075),
            0 2px 2px hsl(0deg 0% 0% / 0.075),
            0 4px 4px hsl(0deg 0% 0% / 0.075),
            0 8px 8px hsl(0deg 0% 0% / 0.075),
            0 16px 16px hsl(0deg 0% 0% / 0.075)!important
        ;
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
        font-stretch: var(--headings-font-stretch);
        font-size: var(--font-size-x-small);
        margin-bottom: 0.25em;
    }

   .map-popup-title { 
        font-stretch: var(--headings-font-stretch);
        font-weight: 700;
        line-height: 1.2;
        ${lineClamp(3)};
        :hover {
            text-decoration: underline;
        }
    }
`;
