import React from 'react';
import styled from 'styled-components';
import MainMenu from '../../common/MainMenu';
import GlobalStyles from '../../../theme/globalStyles';
import { getVar } from '../../../theme';

const Container = styled.div`
    padding: 1.5em;
    max-width: ${getVar('--container-width')};
    margin: 0 auto;
`;

export default function BaseLayout({ route, head, children }) {
    return (
        <html lang="it">
            {head}
            <body>
                <GlobalStyles />
                <Container>
                    <header>
                        <MainMenu route={route} />
                    </header>
                    <main>{children}</main>
                    <footer>footer</footer>
                </Container>
            </body>
        </html>
    );
}
