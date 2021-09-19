import React from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';
import GlobalStyles from '../../../theme/globalStyles';
import PrintStyles from '../../../theme/printStyles';

const HeaderContainer = styled.header`
    height: var(--header-height);
`;

export default function BaseLayout({ route, head, children }) {
    return (
        <html lang="it">
            {head}
            <body>
                <GlobalStyles />
                <PrintStyles />
                <HeaderContainer>
                    <Header route={route} />
                </HeaderContainer>
                <main>{children}</main>
                <footer></footer>
            </body>
        </html>
    );
}
