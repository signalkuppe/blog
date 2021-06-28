import React from 'react';
import styled from 'styled-components';

export default function (Component) {
    const StyledComponent = styled(Component)`
        position: relative;
        ::after {
            content: '';
            display: block;
            width: 1.125em;
            height: 0.125em;
            max-width: 3rem;
            min-height: 0.2rem;
            background: var(--color-primary);
            position: absolute;
            left: 0;
            bottom: 0;
        }
    `;
    return function withFiletto({ ...props }) {
        return <StyledComponent {...props} />;
    };
}
