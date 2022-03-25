import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import Icon from '../../../components/ui/Icon';
import MarkerIcon from '../../../public/icons/Marker.svg';
import { device } from '../../../theme';
import client from './index.client';
import AutocompletStyles from './AutocompletStyles';
import TooltipStyles from './TooltipStyles';

const SearchWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`;

const SearchHint = styled.span`
    font-size: var(--font-size-xx-small);
    color: var(--color-text-dark-accent);
    display: block;
    margin-top: 0.85em;
    padding-left: 1rem;
`;

const SearchContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const StyledIcon = styled(Icon)``;

const StyledLink = styled.a`
    padding: calc(var(--space-unit) / 2);
    padding-right: 0;
    @media ${device.desktop} {
        display: none;
    }
`;

export default function BlogSearch({ category }) {
    return (
        <>
            <AutocompletStyles />
            <TooltipStyles />
            <SearchWrapper>
                <SearchContainer
                    id="js-search"
                    role="search"
                    data-category={category || ''}
                >
                    <input
                        id="js-autocomplete"
                        type="text"
                        dir="ltr"
                        spellCheck="false"
                        autoCorrect="off"
                        autoComplete="off"
                        autoCapitalize="off"
                        maxLength="2048"
                        tabIndex="1"
                    />

                    <StyledLink href="#js-map">
                        <StyledIcon icon={MarkerIcon} l id="js-map-tooltip" />
                    </StyledLink>
                </SearchContainer>
                <SearchHint>Digita almeno 3 caratteri</SearchHint>
            </SearchWrapper>
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/autoComplete.css" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/tippy.css" />',
                    },
                    {
                        where: 'body',
                        tag: '<script src="/libs/autoComplete.js"></script>',
                    },
                    {
                        where: 'body',
                        tag: '<script src="/libs/popper.js"></script>',
                    },
                    {
                        where: 'body',
                        tag: '<script src="/libs/tippy.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
