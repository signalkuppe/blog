import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import Head from '../../../components/common/Head';
import Header from '../../../components/common/Header';
import GlobalStyles from '../../../theme/globalStyles';
import PrintStyles from '../../../theme/printStyles';
import { device, hideScrollbar } from '../../../theme';
import { blogLink } from '../../../pages/blog';
import BasicHtmlStyles from '../../../components/ui/BasicHtmlStyles';
import PageTitle from '../../../components/ui/PageTitle';

const imgeUrl = `https://images.ctfassets.net/rotmy72mdop6/AGcSil2jT7UhmU7oDphmX/4f9972b00fd481338648bc5f5003afda/io___gio.jpg`;
const mobileBackgroundImage = `${imgeUrl}?w=1024&h=682&fl=progressive&fm=jpg&q=80`;
const tabletBackgroundImage = `${imgeUrl}?w=1280&h=853&fl=progressive&fm=jpg&q=80`;
const desktopBackgroundImage = `${imgeUrl}?w=1920&fl=progressive&fm=jpg&q=80`;
const largeDesktopBackgroundImage = `${imgeUrl}?w=2200&fl=progressive&fm=jpg&q=80`;

const bloglink = blogLink();

const StyledPageTitle = styled(PageTitle)`
    margin-bottom: 1.25em;
`;

const HomePageGrid = styled.div`
    padding-bottom: calc(var(--space-unit) * 2);
    @media ${device.desktop} {
        display: grid;
        height: 100vh;
        grid-template-columns: 60vw 40vw;
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
    background-blend-mode: difference;
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
        max-width: 85ch;
        padding-top: calc(var(--space-unit) * 2);
        ${hideScrollbar};
    }
`;

export default function HomePage({ route, head }) {
    return (
        <html lang="it">
            <Head
                title={vars.siteName}
                slogan={vars.siteSlogan}
                description={vars.description}
            />
            <body>
                <GlobalStyles />
                <PrintStyles />
                <HomePageGrid>
                    <HomePageGridHeader>
                        <Header route={route} />
                    </HomePageGridHeader>
                    <HomePageGridImage />
                    <HomePageGridContent>
                        <StyledPageTitle small>Piacere Matteo!</StyledPageTitle>
                        <BasicHtmlStyles>
                            <p>
                                Benvenuti sul mio blog. La{' '}
                                <strong>montagna</strong> è la mia grande
                                passione. È stato mio papà a introdurmi a questo
                                magico mondo e, da allora, non ho mai smesso di
                                cercare nuove avventure. Questo blog è un
                                semplice{' '}
                                <a href={bloglink}>
                                    diario di tutte le mie gite,
                                </a>{' '}
                                spero possa esservi utile per scoprire nuovi
                                itinerari.
                            </p>

                            <p>
                                Sono un semplice{' '}
                                <strong>appassionato di fotografia, </strong>
                                senza alcuna velleità professionale. Potete
                                utilizzare tutte le mie foto come volete. Non
                                avete neanche l’obbligo di citare la fonte ma un
                                gesto di cortesia verrà apprezzato sicuramente.
                            </p>
                            <p>
                                Lavoro come un{' '}
                                <strong>front-end engineer.</strong> Trasformo
                                un design in un’applicazione web, con
                                particolare attenzione alla scomposizione in
                                componenti. Utilizzo principalmente{' '}
                                <a href="https://reactjs.org/">React</a>,{' '}
                                <a href="https://storybook.js.org/">
                                    Storybook
                                </a>{' '}
                                e{' '}
                                <a href="https://styled-components.com/">
                                    Styled Components
                                </a>{' '}
                                . Quando possibile cerco di non usare alcun
                                framework. Amo{' '}
                                <a href="https://en.wikipedia.org/wiki/CSS">
                                    css,
                                </a>{' '}
                                credo sia un linguaggio meraviglioso.
                            </p>
                            <p>
                                <a
                                    href="https://it.wikipedia.org/wiki/Punta_Gnifetti"
                                    rel="noopener"
                                >
                                    Signalkuppe
                                </a>
                                <em> — il mio nickname — </em> è il nome in
                                tedesco della Punta Gnifetti.
                            </p>
                            <p>
                                <a href="/contatti" rel="noopener">
                                    Contattatemi
                                </a>{' '}
                                per parlare di un vostro progetto o di montagna!
                            </p>
                        </BasicHtmlStyles>
                    </HomePageGridContent>
                </HomePageGrid>
            </body>
        </html>
    );
}
