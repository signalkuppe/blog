import React from 'react';
import styled, { css } from 'styled-components';

export const styles = css`
    position: relative;
    ::after {
        content: '';
        display: block;
        width: 1.125em;
        height: 0.125em;
        max-width: 4rem;
        min-height: 0.2rem;
        background: var(--color-primary);
        position: absolute;
        left: 0;
        bottom: -0.1em;
    }
`;

export default function (Component) {
    const StyledComponent = styled(Component)`
        ${styles}
    `;
    return function withFiletto({ ...props }) {
        return <StyledComponent {...props} />;
    };
}
