import { css } from 'styled-components';

export const vars = {
    '--font-family-base': '"Inter", sans-serif',
    '--font-family-headings': '"Inter Tight", sans-serif',
    '--font-family-cursive': '"Sriracha", cursive',
    '--font-family-drop-cap': "'Didot', Georgia",
    '--font-size-xx-small': '0.5rem',
    '--font-size-x-small': '0.75rem',
    '--font-size-small': '0.85rem',
    '--font-size-base': '1rem',
    '--font-size-medium': '1.25rem',
    '--font-size-large': '1.5rem',
    '--font-size-x-large': '2rem',
    '--font-size-xx-large': '3rem',
    '--font-size-xxx-large': '4rem',
    '--font-size-xxxx-large': '5rem',
    '--text-letter-spacing': '-0.02em',
    '--headings-letter-spacing': '-0.02em',
    '--color-background-hue': '190',
    '--color-background-saturation': '6%',
    '--color-background-lightness': '7%',
    '--color-text-hue': '0',
    '--color-text-saturation': '0%',
    '--color-text-lightness': '75%',
    '--color-primary-hue': '43',
    '--color-primary-saturation': '89%',
    '--color-primary-lightness': '50%',
    '--color-background':
        'hsl(var(--color-background-hue), var(--color-background-saturation), var(--color-background-lightness))',
    '--color-background-light':
        'hsl(var(--color-background-hue), var(--color-background-saturation), calc(var(--color-background-lightness) + 5%))',
    '--color-primary':
        'hsl(var(--color-primary-hue), var(--color-primary-saturation), var(--color-primary-lightness))',
    '--color-secondary':
        'hsl(calc(var(--color-primary-hue) + 320), var(--color-primary-saturation), calc(var(--color-primary-lightness) - 5%))',
    '--color-text':
        'hsl(var(--color-text-hue), var(--color-text-saturation), var(--color-text-lightness))',
    '--color-text-accent':
        'hsl(var(--color-text-hue), var(--color-text-saturation), calc(var(--color-text-lightness) + 15%))',
    '--color-text-light-accent':
        'hsl(var(--color-text-hue), var(--color-text-saturation), calc(var(--color-text-lightness) + 30%))',
    '--color-text-dark-accent':
        'hsl(var(--color-text-hue), var(--color-text-saturation), calc(var(--color-text-lightness) - 20%))',
    '--color-links': 'var(--color-primary)',
    '--color-button-background': 'var(--color-primary)',
    '--color-button-color': 'var(--color-background)',
    '--color-map-marker-background': 'var(--color-secondary)',
    '--color-map-track': 'var(--color-secondary)',
    '--color-lightbox-background': 'var(--color-background)',
    '--color-lightbox-color': 'var(--color-text)',
    '--color-lightbox-overlay': 'hsla(210deg, 15%, 12%, 0.5)',
    '--color-facebook': '#1877f2',
    '--color-twitter': '#1da1f2',
    '--color-whatsapp': '#25d366',
    '--inputs-border': '4px solid var(--color-text-light-accent)',
    '--inputs-background': 'var(--color-background)',
    '--inputs-color': 'var(--color-text)',
    '--inputs-padding': '1em',
    '--inputs-border-radius': '999999px',
    '--inputs-focused-border-color': 'var(--color-primary)',
    '--border-radius': '10px',
    '--space-unit': '1.5rem',
    '--logo-width': '9rem',
    '--container-max-width': '80rem',
    '--container-offset': 'calc(var(--logo-width) + var(--space-unit))',
    '--header-height': '8rem',
    '--blog-tabs-height': 'clamp(4em, 10vw, 5em)',
    '--blog-search-height': '10em',
    '--z-index-menu': '10000',
    '--z-index-map': '100',
    '--z-index-map-selected-marker': '10000',
    '--z-index-autocomplete': '100000',
    '--z-index-post-cover': '10',
    '--z-index-post-cover-caption': '100',
    '--z-index-post-menu': '1000000',
    '--drop-shadow-color': 'rgba(0, 0, 0, 0.35)',
};

export const headingsStyles = css`
    font-family: var(--font-family-headings);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 0.5rem;
    color: var(--color-text-light-accent);
`;

export const headingsSize = {
    h1: 'var(--font-size-xxx-large)',
    h2: 'var(--font-size-large)',
    h3: 'var(--font-size-medium)',
};

export const linksStyles = css`
    color: var(--color-links);
    font-weight: 600;
    :hover {
        text-decoration: underline;
        text-decoration-thickness: 3px;
        text-underline-offset: 0.1em;
    }
`;

export const imagesStyles = css`
    max-width: 100%;
    height: auto;
    display: block;
    aspect-ratio: attr(width) / attr(height);
    text-indent: -9999px;
    border: none;
    outline: none;
    :-moz-loading {
        visibility: hidden;
    }
    color: var(--color-background-light);
    background: var(--color-background-light);
`;

export const italicStyles = css`
    font-family: var(--font-family-cursive);
    color: var(--color-text-accent);
`;

export const boldStyles = css`
    font-weight: 700;
    color: var(--color-text-accent);
`;

export const figCaptionStyles = css`
    font-family: var(--font-family-cursive);
    color: var(--color-text-light-accent);
    line-height: 1.5;
    padding-top: 0.5em;
`;

export const pageMenuTypography = css`
    font-weight: 700;
    font-size: var(--font-size-base);
    letter-spacing: var(--headings-letter-spacing);
`;

export const device = {
    mobile: `screen and (max-width: 47.9375rem)`, // <= 767px
    mobileAndTablet: `screen and (max-width: 85.3125rem)`, // <= 1365
    onlyTablet: `screen and (min-width: 48rem) and (max-width: 85.3125rem)`, // >= 768px <= 1365px
    atLeastTablet: `screen and (min-width: 48rem)`, // >= 768px
    desktop: `screen and (min-width: 85.3125rem)`, // >= 1366px
    largeDesktop: `screen and (min-width: 120rem)`, // >= 1920px
    noReduceMotion: `screen and (prefers-reduced-motion: no-preference)`,
    portrait: `screen and (orientation: portrait)`,
    landscape: `screen and (orientation: landscape)`,
};

export const visuallyHidden = css`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 0px;
`;

export const hideScrollbar = css`
    -ms-overflow-style: none;
    /* stylelint-disable-next-line */
    ::-webkit-scrollbar {
        display: none;
    }
    scrollbar-width: none;
`;

export const lineClamp = (lines = 1) => {
    return css`
        /* stylelint-disable-next-line */
        display: -webkit-box;
        -webkit-line-clamp: ${lines};
        -webkit-box-orient: vertical;
        overflow: hidden;
    `;
};

export const propsToFontSize = (props) => {
    if (props.xxs) {
        return 'var(--font-size-xx-small)';
    } else if (props.xs) {
        return 'var(--font-size-x-small)';
    } else if (props.s) {
        return 'var(--font-size-small)';
    } else if (props.l) {
        return 'var(--font-size-large)';
    } else if (props.xl) {
        return 'var(--font-size-x-large)';
    } else if (props.xxl) {
        return 'var(--font-size-xx-large)';
    } else if (props.xxxl) {
        return 'var(--font-size-xxx-large)';
    } else {
        return 'inherit';
    }
};
