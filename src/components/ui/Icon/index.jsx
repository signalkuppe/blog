import React from 'react';
import styled from 'styled-components';
import { propsToFontSize } from '../../../theme';

function Icon({ icon, ...props }) {
    const Svg = icon;
    return <Wrapper {...props}>{Svg && <Svg />}</Wrapper>;
}

const Wrapper = styled.span`
    font-size: ${propsToFontSize};
    margin-right: ${(props) => (props.left ? '0.25em' : '0px')};
    margin-left: ${(props) => (props.right ? '0.25em' : '0px')};
    color: ${(props) => {
        if (props.primary) {
            return props.theme.colors.primary;
        } else {
            return 'inherit';
        }
    }};
    display: inline-flex;
    vertical-align: -0.125em;
    svg {
        display: inline-block;
        font-size: inherit;
        width: 1em;
        height: 1em;
        overflow: visible;
    }
`;

export default Icon;
