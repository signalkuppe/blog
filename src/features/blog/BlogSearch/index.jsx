import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
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
                </SearchContainer>
                <SearchHint>Digita almeno 3 caratteri</SearchHint>
            </SearchWrapper>
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" media="screen" href="/libs/autoComplete.css" />',
                    },
                    {
                        where: 'body',
                        tag: '<script defer src="/libs/autoComplete.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
