import { css } from 'styled-components';

// consider this themes

// https://coolors.co/cfdbd5-e8eddf-f5cb5c-242423-333533

export const vars = {
    '--color-background': '#11131A',
    '--color-background-light': '#1D1F26',
    '--color-primary': '#F4BF3A',
    '--color-secondary': '#4790F9',
    '--color-text': '#CACDD6',
    '--color-text-light-accent': '#FFFFFF',
    '--color-text-dark-accent': '#AAAAAA',
    '--color-facebook': '#1877f2',
    '--color-twitter': '#1da1f2',
    '--color-whatsapp': '#25d366',
    '--color-error': 'crimson',
    '--font-family-base': "'Roboto Flex', sans-serif",
    '--font-family-cursive': "'Sriracha', cursive",
    '--font-family-drop-cap': "'Yeseva One', cursive",
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
    '--narrow-font-stretch': 'condensed',
    '--extra-narrow-font-stretch': 'extra-condensed',
    '--inputs-border': '4px solid var(--color-text)',
    '--inputs-background': 'var(--color-background)',
    '--inputs-color': 'var(--color-text)',
    '--inputs-padding': '1em',
    '--inputs-border-radius': '35px',
    '--inputs-focused-border-color': 'var(--color-primary)',
    '--space-unit': '1.5rem',
    '--logo-width': '9rem',
    '--container-max-width': '80rem',
    '--container-offset': 'calc(var(--logo-width) + var(--space-unit))',
    '--header-height': 'clamp(5em, 10vw, 6em)',
    '--blog-tabs-height': 'clamp(4em, 10vw, 5em)',
    '--blog-search-height': '8em',
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
    font-weight: 900;
    font-stretch: var(--narrow-font-stretch);
    line-height: 1.1;
    margin-bottom: 0.5rem;
    letter-spacing: 0;
    color: var(--color-text-light-accent);
`;

export const headingsSize = {
    h1: 'var(--font-size-xxx-large)',
    h2: 'var(--font-size-x-large)',
    h3: 'var(--font-size-large)',
};

export const device = {
    mobile: `screen and (max-width: 47.9375rem)`, // <= 767px
    mobileAndTablet: `screen and (max-width: 85.3125rem)`, // <= 1365
    onlyTablet: `screen and (min-width: 48rem) and (max-width: 85.3125rem)`, // >= 768px <= 1365px
    atLeastTablet: `screen and (min-width: 48rem)`, // >= 768px
    desktop: `screen and (min-width: 85.3125rem)`, // >= 1366px
    largeDesktop: `screen and (min-width: 120rem)`, // >= 1920px
    noReduceMotion: `screen and (prefers-reduced-motion: no-preference)`,
};

export const visuallyHidden = css`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
`;

export const hideScrollbar = css`
    ::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`;

export const lineClamp = (lines = 1) => {
    return css`
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
