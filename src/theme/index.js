import { css } from 'styled-components';

export const vars = {
    '--color-background': '#11131A',
    '--color-background-light': '#1D1F26',
    '--color-primary': '#F4BF3A',
    '--color-secondary': '#4790F9',
    '--color-text': '#CACDD6',
    '--color-text-light-accent': '#FFFFFF',
    '--color-text-dark-accent': '#AAAAAA',
    '--font-family-base': "'Roboto Flex', sans-serif",
    '--font-family-cursive': "'Lobster', cursive",
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
    '--space-unit': '1.5rem',
    '--header-height': '6rem',
    '--logo-width': '9rem',
    '--container-max-width': '80rem',
    '--container-offset': 'calc(var(--logo-width) + var(--space-unit))',
    '--z-index-menu': '1000',
};

export const headingsStyles = css`
    font-weight: 900;
    font-stretch: 50%;
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
