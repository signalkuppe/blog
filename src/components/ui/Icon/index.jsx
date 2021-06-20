import React from 'react';
import styled from 'styled-components';
import { propsToFontSize } from '../../../theme';

const Wrapper = styled.span`
    font-size: ${propsToFontSize};
    margin-right: ${(props) => (props.left ? '0.5em' : '0px')};
    margin-left: ${(props) => (props.right ? '0.5em' : '0px')};
    color: ${(props) => {
        if (props.primary) {
            return props.theme.colors.primary;
        } else {
            return 'inherit';
        }
    }};
    display: inline-flex;
    vertical-align: ${(props) => {
        if (props.middle) {
            return 'middle';
        } else if (props.bottom) {
            return 'bottom';
        } else if (props.baseline) {
            return 'baseline';
        } else if (props.top) {
            return 'top';
        } else if (props.sub) {
            return 'sub';
        } else if (props.textTop) {
            return 'text-top';
        } else if (props.textBottom) {
            return 'text-bottom';
        } else {
            return 'inherit';
        }
    }};
    svg {
        display: inline-block;
        font-size: inherit;
        width: 1em;
        height: 1em;
        overflow: visible;
    }
`;

function Icon({ icon, ...props }) {
    const Svg = icon;
    return <Wrapper {...props}>{Svg && <Svg />}</Wrapper>;
}
export default Icon;
