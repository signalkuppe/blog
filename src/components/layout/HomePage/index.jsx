import React from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';
import GlobalStyles from '../../../theme/globalStyles';
import PrintStyles from '../../../theme/printStyles';
import { device, hideScrollbar } from '../../../theme';

// const backgroundImage = `https://images.ctfassets.net/rotmy72mdop6/3iiV7tgtBJp8tiaxEJ39aU/fa70ac03418b481167934741736b6ee0/P8090252_Nik_Nik_final-1.jpg`;

const backgroundImage =
    'https://images.ctfassets.net/rotmy72mdop6/5tfH7ff8Kj3mCSJkTMMAhv/f04ede83d01849cfcab5eac37af15c9d/alpinismo-pizzo-tremogge-selfie.jpg';
const HomePageGrid = styled.div`
    display: grid;
    height: 100vh;
    @media ${device.desktop} {
        grid-template-columns: 50vw 50vw;
        grid-template-rows: var(--header-height) calc(
                100vh - var(--header-height)
            );
    }
`;
const HomePageGridHeader = styled.header`
    grid-area: 1 / 1 / 1 / span 2;
`;
const HomePageGridImage = styled.figure`
    grid-area: 1 / 2 / 1 / 1;
    background-color: var(--color-background);
    background-image: url(${backgroundImage});
    background-position: left top;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
`;
const HomePageGridContent = styled.main`
    grid-area: 2 / 2 / 2 / 2;
    height: calc(100vh - var(--header-height));
    overflow-y: auto;
`;

const Children = styled.article`
    padding: 0 4vmax 2vh 4vmax;
    max-width: 100ch;
`;

export default function HomePageLayout({ route, head, children }) {
    return (
        <html lang="it">
            {head}
            <body>
                <GlobalStyles />
                <PrintStyles />
                <HomePageGrid>
                    <HomePageGridHeader>
                        <Header route={route} />
                    </HomePageGridHeader>
                    <HomePageGridImage />
                    <HomePageGridContent>
                        <Children>{children}</Children>
                    </HomePageGridContent>
                </HomePageGrid>
            </body>
        </html>
    );
}
