import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { device } from '../../../theme';

const loader = keyframes`
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
`;

const loaderInner = keyframes`
  0% {
    height: 0%;
  }

  25% {
    height: 0%;
  }

  50% {
    height: 100%;
  }

  75% {
    height: 100%;
  }

  100% {
    height: 0%;
  }
`;

const size = css`
    width: ${(props) => props.size || '3em'};
    height: ${(props) => props.size || '3rem'};
`;

const LoaderWrapper = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
`;

const LoaderContainer = styled.div`
    ${size}
    position: relative;
    border: 4px solid var(--color-primary);
    top: 50%;
    @media ${device.noReduceMotion} {
        animation: ${loader} 4s infinite ease;
    }
`;

const LoaderInner = styled.div`
    vertical-align: top;
    display: inline-block;
    width: 100%;
    background-color: var(--color-primary);
    @media ${device.noReduceMotion} {
        animation: ${loaderInner} 3s infinite ease-in;
    }
`;

const LoaderText = styled.span`
    font-size: var(--font-size-small);
    margin-top: 1em;
    display: inline-block;
`;

export default function Loader({ size, children }) {
    return (
        <LoaderWrapper>
            <LoaderContainer size={size}>
                <LoaderInner />
            </LoaderContainer>
            {children && <LoaderText>{children}</LoaderText>}
        </LoaderWrapper>
    );
}
