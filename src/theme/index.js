export const vars = {
    '--color-primary': '#b02626',
    '--color-text': '#282828',
    '--font-size-xx-small': '0.5rem',
    '--font-size-x-small': '0.75rem',
    '--font-size--small': '0.85rem',
    '--font-size--base': '1rem',
    '--font-size--large': '1.5rem',
    '--font-size--x-large': '2rem',
    '--font-size--xx-large': '3rem',
    '--font-size--xxx-large': '4rem',
    '--space-unit': '1.5rem',
    '--container-width': '1388px',
};

export const getVar = function (v) {
    return `var(${v})`;
};

export const device = {
    mobile: `screen and (max-width: 767px)`,
    mobileAndTablet: `screen and (max-width: 1377px)`,
    onlyTablet: `screen and (min-width: 768px) and (max-width: 1377px)`,
    atLeastTablet: `screen and (min-width: 768px)`,
    desktop: `screen and (min-width: 1388px)`,
};

export const propsToFontSize = (props) => {
    if (props.xxs) {
        return getVar('--font-size-xx-small');
    } else if (props.xs) {
        return getVar('--font-size-x-small');
    } else if (props.s) {
        return getVar('--font-size--small');
    } else if (props.l) {
        return getVar('--font-size-large');
    } else if (props.xl) {
        return getVar('--font-size-x-large');
    } else if (props.xxl) {
        return getVar('--font-size-xx-large');
    } else if (props.xxxl) {
        return getVar('--font-size-xxx-large');
    } else {
        return 'inherit';
    }
};
