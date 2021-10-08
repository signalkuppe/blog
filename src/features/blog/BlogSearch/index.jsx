import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import client from './index.client';
import AutocompletStyles from './AutocompletStyles';

const SearchContainer = styled.div`
    padding: calc(var(--space-unit) * 1.5) var(--space-unit);
    background: var(--color-background-light);
    display: flex;
    justify-content: center;
`;

export default function BlogSearch({ category }) {
    return (
        <>
            <AutocompletStyles />
            <SearchContainer
                id="js-search"
                role="search"
                data-category={category || ''}
            >
                <input
                    id="js-autocomplete"
                    type="search"
                    dir="ltr"
                    spellCheck="false"
                    autoCorrect="off"
                    autoComplete="off"
                    autoCapitalize="off"
                    maxLength="2048"
                    tabIndex="1"
                />
            </SearchContainer>
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/autoComplete.css" />',
                    },
                    {
                        where: 'body',
                        tag: '<script src="/libs/autoComplete.js"></script>',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
