import React from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';
import GlobalStyles from '../../../theme/globalStyles';
import Container from '../Container';

const HeaderContainer = styled.header`
    height: var(--header-height);
    outline: 1px solid yellow;
`;

export default function BaseLayout({ route, head, children }) {
    return (
        <html lang="it">
            {head}
            <body>
                <GlobalStyles />
                <HeaderContainer>
                    <Header route={route} />
                </HeaderContainer>
                <main>
                    <Container>{children}</Container>
                </main>
                <footer>footer</footer>
            </body>
        </html>
    );
}
