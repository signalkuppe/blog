import React from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';
import GlobalStyles from '../../../theme/globalStyles';
import PrintStyles from '../../../theme/printStyles';
import { device } from '../../../theme';

const imgeUrl = `https://images.ctfassets.net/rotmy72mdop6/5tfH7ff8Kj3mCSJkTMMAhv/f04ede83d01849cfcab5eac37af15c9d/alpinismo-pizzo-tremogge-selfie.jpg`;
const mobileBackgroundImage = `${imgeUrl}?w=1024&h=682&fl=progressive&fm=jpg&q=80`;
const tabletBackgroundImage = `${imgeUrl}?w=1280&h=853&fl=progressive&fm=jpg&q=80`;
const desktopBackgroundImage = `${imgeUrl}?w=1920&fl=progressive&fm=jpg&q=80`;
const largeDesktopBackgroundImage = `${imgeUrl}?w=2200&fl=progressive&fm=jpg&q=80`;

const HomePageGrid = styled.div`
    padding-bottom: calc(var(--space-unit) * 2);
    @media ${device.desktop} {
        display: grid;
        height: 100vh;
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
    background-color: var(--color-background-light);
    background-position: left top;
    background-repeat: no-repeat;
    background-size: cover;
    @media ${device.mobileAndTablet} {
        width: 100vw;
        aspect-ratio: 3/2;
        margin-bottom: calc(var(--space-unit) * 2);
    }
    @media ${device.mobile} {
        background-image: url(${mobileBackgroundImage});
    }
    @media ${device.onlyTablet} {
        background-image: url(${tabletBackgroundImage});
        margin-bottom: calc(var(--space-unit) * 4);
    }

    @media ${device.desktop} {
        grid-area: 1 / 2 / 1 / 1;
        height: 100vh;
        background-image: url(${desktopBackgroundImage});
    }
    @media ${device.largeDesktop} {
        background-image: url(${largeDesktopBackgroundImage});
    }
`;
const HomePageGridContent = styled.main`
    padding: 0 4vmax 2vh 4vmax;
    @media ${device.mobileAndTablet} {
        margin: 0 auto;
        max-width: 70ch;
    }
    @media ${device.desktop} {
        grid-area: 2 / 2 / 2 / 2;
        height: calc(100vh - var(--header-height));
        overflow-y: auto;
        max-width: 90ch;
    }
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
                    <HomePageGridContent>{children}</HomePageGridContent>
                </HomePageGrid>
            </body>
        </html>
    );
}
