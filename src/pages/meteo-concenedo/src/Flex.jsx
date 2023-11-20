import React from 'react';
import styled from 'styled-components';

function FlexContainer({ children, ...props }, ref) {
    return (
        <StyledFlexContainer ref={ref} {...props}>
            {children}
        </StyledFlexContainer>
    );
}

const StyledFlexContainer = styled.div`
    display: ${(props) => props.display || 'flex'};
    flex-direction: ${(props) => props.flexDirection || 'row'};
    flex-wrap: ${(props) => props.flexWrap || 'nowrap'};
    flex-grow: ${(props) => props.flexGrow || 0};
    flex-shrink: ${(props) => props.flexShrink || 1};
    align-items: ${(props) => props.alignItems || 'normal'};
    align-content: ${(props) => props.alignContent || 'normal'};
    justify-content: ${(props) => props.justifyContent || 'normal'};
    gap: ${(props) => props.gap};
    width: ${(props) => props.width || 'auto'};
    height: ${(props) => props.height || 'auto'};
`;

export default React.forwardRef(FlexContainer);
