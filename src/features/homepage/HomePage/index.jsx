import React from 'react';
import styled, { keyframes } from 'styled-components';
import vars from '../../../vars';
import { device, hideScrollbar, imagesStyles } from '../../../theme';
import { blogLink } from '../../../pages/blog';
import { portfolioLink } from '../../../pages/portfolio';
import { permalink as contattilink } from '../../../pages/contatti';
import Head from '../../../components/common/Head';
import Header from '../../../components/common/Header';
import Html from '../../../components/common/Html';
import Body from '../../../components/common/Body';
import CommonStyles from '../../../components/common/CommonStyles';
import BasicHtmlStyles from '../../../components/ui/BasicHtmlStyles';
import PageTitle from '../../../components/ui/PageTitle';

const imgeUrl = vars.homepageFoto;
const smallImage = `${imgeUrl}?w=800&h=533&fm=webp&q=50`;
const mediumImage = `${imgeUrl}?w=1280&h=853&fm=webp&q=50`;
const largeImage = `${imgeUrl}?w=1920&h=1280&fm=webp&q=50`;
const extraLargeImage = `${imgeUrl}?w=3000&h=2000&fm=webp&q=50`;

const bloglink = blogLink();
const portfoliolink = portfolioLink();

const StyledPageTitle = styled(PageTitle)`
    margin-bottom: 1.5em;
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
    @media ${device.desktop} {
        z-index: 1;
    }
`;
const HomePageGridImage = styled.figure`
    @media ${device.mobileAndTablet} {
        width: 100vw;
        aspect-ratio: 3/2;
        margin-bottom: calc(var(--space-unit) * 3);
    }
    @media ${device.onlyTablet} {
        margin-bottom: calc(var(--space-unit) * 4);
    }
    @media ${device.desktop} {
        grid-area: 1 / 2 / 1 / 1;
        height: 100vh;
    }
    img {
        ${imagesStyles}
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: brightness(0.8) contrast(1.3);
    }
`;
const HomePageGridContent = styled.main`
    padding: 0 4vmax 2vh 4vmax;
    margin: 0 auto;
    @media ${device.mobileAndTablet} {
        margin: 0 auto;
    }
    @media ${device.desktop} {
        grid-area: 2 / 2 / 2 / 2;
        height: calc(100vh - var(--header-height));
        overflow-y: auto;
        padding-top: calc(var(--space-unit) * 3);
        ${hideScrollbar};
    }
    p {
        display: inline-block;
        max-width: 55ch;
    }
`;

const animation = keyframes`
    0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(14.0deg) }
   20% { transform: rotate(-8.0deg) }
   30% { transform: rotate(14.0deg) }
   40% { transform: rotate(-4.0deg) }
   50% { transform: rotate(10.0deg) }
   60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
`;

const Hand = styled.span`
    display: inline-block;
    margin-left: 0.2em;
    @media ${device.noReduceMotion} {
        animation-name: ${animation};
        animation-duration: 1.2s;
        animation-delay: 1s;
        transform-origin: 70% 70%;
    }
`;

export default function HomePage({ route }) {
    return (
        <Html>
            <Head
                title={vars.siteName}
                slogan={vars.siteSlogan}
                description={vars.description}
                extraLinks={
                    <>
                        <link
                            rel="preconnect"
                            href="https://assets.ctfassets.net"
                            crossOrigin="anonymous"
                        />
                        {/** we don't use quicklink to save a js file request */}
                        <link
                            rel="prefetch"
                            href={`${vars.websiteUrl}${bloglink}`}
                        />
                        <link
                            rel="prefetch"
                            href={`${vars.websiteUrl}${portfoliolink}`}
                        />
                        <link
                            rel="prefetch"
                            href={`${vars.websiteUrl}${contattilink}`}
                        />
                    </>
                }
            />
            <Body>
                <CommonStyles />
                <HomePageGrid>
                    <HomePageGridHeader>
                        <Header route={route} />
                    </HomePageGridHeader>
                    <HomePageGridImage>
                        <picture>
                            <source
                                media="(min-width: 2500px)"
                                srcSet={extraLargeImage}
                            />
                            <source
                                media="(min-width: 1920px)"
                                srcSet={largeImage}
                            />
                            <source
                                media="(min-width: 1024px)"
                                srcSet={mediumImage}
                            />
                            <img
                                src={smallImage}
                                alt="Matteo e Giorgio Leoni"
                            />
                        </picture>
                    </HomePageGridImage>
                    <HomePageGridContent>
                        <StyledPageTitle small forwardedAs="h2">
                            Piacere Matteo <Hand aria-hidden="true">👋</Hand>
                        </StyledPageTitle>
                        <BasicHtmlStyles>
                            <p>
                                Benvenuti sul mio blog. La{' '}
                                <strong>montagna</strong> è la mia grande
                                passione. È stato <strong>mio papà</strong> a
                                introdurmi a questo magico mondo e, da allora,
                                non ho mai smesso di cercare nuove avventure.
                                Questo blog è un{' '}
                                <a
                                    href={bloglink}
                                    title="Elenco alle relazioni"
                                >
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
                                componenti e alle performance. Utilizzo
                                principalmente{' '}
                                <a href="https://reactjs.org/">React</a>,{' '}
                                <a href="https://www.figma.com/">Figma</a>,{' '}
                                <a href="https://storybook.js.org/">
                                    Storybook
                                </a>{' '}
                                e{' '}
                                <a href="https://styled-components.com/">
                                    Styled Components
                                </a>{' '}
                                . Amo{' '}
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
                                Questo sito è stato realizzato con{' '}
                                <a
                                    href="https://github.com/signalkuppe/pequeno"
                                    title="Pequeno, uno static site generator basato su react"
                                >
                                    Pequeño
                                </a>
                                , uno <strong>static site generator</strong>{' '}
                                basato su React che ho sviluppato appositamente
                                per questo blog. Se volete spulciare il codice
                                sorgente{' '}
                                <a
                                    href="https://github.com/signalkuppe/blog"
                                    rel="noopener"
                                    title="Il codice sorgente del blog"
                                >
                                    lo trovate qui.
                                </a>
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
            </Body>
        </Html>
    );
}
