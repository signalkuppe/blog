import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import vars from '../../../vars';
import {
    device,
    headingsStyles,
    hideScrollbar,
    visuallyHidden,
} from '../../../theme';
import { blogLink } from '../../../pages/blog';
import { portfolioLink } from '../../../pages/portfolio';
import { permalink as contattilink } from '../../../pages/contatti';
import Container from '../../../components/layout/Container';
import Head from '../../../components/common/Head';
import Header from '../../../components/common/Header';
import Html from '../../../components/common/Html';
import Body from '../../../components/common/Body';
import CommonStyles from '../../../components/common/CommonStyles';
import BasicHtmlStyles from '../../../components/ui/BasicHtmlStyles';
import Icon from '../../../components/ui/Icon';
import MountainIcon from '../../../public/icons/Mountain.svg';
import AlpinismoIcon from '../../../public/icons/Alpinismo.svg';
import EscursionismoIcon from '../../../public/icons/Escursionismo.svg';
import ScialpinismoIcon from '../../../public/icons/Scialpinismo.svg';
import TrailRunningIcon from '../../../public/icons/Trail.svg';
import TrekkingIcon from '../../../public/icons/Trekking.svg';
import CameraIcon from '../../../public/icons/Camera.svg';
import CodeIcon from '../../../public/icons/Code.svg';
import ViaggiIcon from '../../../public/icons/Viaggi.svg';

const bloglink = blogLink();
const portfoliolink = portfolioLink();
const image = `${vars.homepageFoto}?w=680&fm=webp&q=40`;

const whats = [
    {
        icon: MountainIcon,
        text: 'un appassionato di montagna',
    },
    {
        icon: AlpinismoIcon,
        text: 'un quasi alpinista',
    },
    {
        icon: EscursionismoIcon,
        text: 'un escursionista',
    },
    {
        icon: ScialpinismoIcon,
        text: 'uno scialpinista',
    },
    {
        icon: TrailRunningIcon,
        text: 'un trail runner',
    },
    {
        icon: TrekkingIcon,
        text: 'un trekker',
    },
    {
        icon: CameraIcon,
        text: 'un appassionato di fotografia',
    },
    {
        icon: CodeIcon,
        text: 'un front-end engineer',
    },
    {
        icon: ViaggiIcon,
        text: 'un viaggiatore',
    },
];

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
                <Header route={route} as="header" />
                <StyledContainer fullWidth>
                    <InnerContainer>
                        <Content>
                            <hgroup>
                                <StyledPageTitle forwardedAs="h2">
                                    Piacere Matteo{' '}
                                    <Hand aria-hidden="true">👋</Hand>
                                </StyledPageTitle>
                                <PageSubTitle>
                                    <span>Sono</span>
                                    <PageTitleWhatWrapper>
                                        {whats.map((what, index) => (
                                            <PageSubTitleWhat key={index}>
                                                <Icon icon={what.icon} />
                                                {what.text}
                                                {index < whats.length - 1 && (
                                                    <Comma>, </Comma>
                                                )}
                                            </PageSubTitleWhat>
                                        ))}
                                    </PageTitleWhatWrapper>
                                </PageSubTitle>
                            </hgroup>
                            <TextConstraint>
                                <Intro>
                                    Questo blog è un diario di tutte le mie
                                    gite, spero possa esservi utile per scoprire
                                    nuovi itinerari.
                                </Intro>
                            </TextConstraint>
                            <Details>
                                <Summary>
                                    <SummaryOpenText>
                                        Vuoi saperne di più?
                                    </SummaryOpenText>
                                    <SummaryCloseText>
                                        Meno grazie
                                    </SummaryCloseText>
                                </Summary>
                                <TextConstraint>
                                    <BasicHtmlStyles>
                                        <p>
                                            La <strong>montagna</strong> è la
                                            mia grande passione. È stato{' '}
                                            <strong>mio papà</strong> a
                                            introdurmi a questo magico mondo e,
                                            da allora, non ho mai smesso di
                                            cercare nuove avventure.
                                        </p>

                                        <p>
                                            Sono un semplice{' '}
                                            <strong>
                                                appassionato di fotografia,{' '}
                                            </strong>
                                            senza alcuna velleità professionale.
                                            Potete utilizzare tutte le mie foto
                                            come volete. Non avete neanche
                                            l’obbligo di citare la fonte ma un
                                            gesto di cortesia verrà apprezzato
                                            sicuramente.
                                        </p>
                                        <p>
                                            Lavoro come un{' '}
                                            <strong>front-end engineer.</strong>{' '}
                                            Trasformo un design in
                                            un’applicazione web, con particolare
                                            attenzione alla scomposizione in
                                            componenti e alle performance.
                                            Utilizzo principalmente{' '}
                                            <a href="https://reactjs.org/">
                                                React
                                            </a>
                                            ,{' '}
                                            <a href="https://www.figma.com/">
                                                Figma
                                            </a>
                                            ,{' '}
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
                                            credo sia un linguaggio
                                            meraviglioso.
                                        </p>
                                        <p>
                                            <a
                                                href="https://it.wikipedia.org/wiki/Punta_Gnifetti"
                                                rel="noopener"
                                            >
                                                Signalkuppe
                                            </a>
                                            <em> — il mio nickname — </em> è il
                                            nome in tedesco della Punta
                                            Gnifetti.
                                        </p>
                                        <p>
                                            Questo sito è stato realizzato con{' '}
                                            <a
                                                href="https://github.com/signalkuppe/pequeno"
                                                title="Pequeno, uno static site generator basato su react"
                                            >
                                                Pequeño
                                            </a>
                                            , uno{' '}
                                            <strong>
                                                static site generator
                                            </strong>{' '}
                                            basato su React che ho sviluppato
                                            appositamente per il blog. Se volete
                                            spulciare il codice sorgente{' '}
                                            <a
                                                href="https://github.com/signalkuppe/blog"
                                                rel="noopener"
                                                title="Il codice sorgente del blog"
                                            >
                                                lo trovate qui.
                                            </a>
                                        </p>
                                        <p>
                                            Esiste{' '}
                                            <a href={vars.newsletterUrl}>
                                                una newsletter
                                            </a>{' '}
                                            per ricevere gli ultimi
                                            aggiornamenti del sito, e un{' '}
                                            <a
                                                href={`${vars.websiteUrl}/rss.xml`}
                                            >
                                                feed rss
                                            </a>{' '}
                                            con l’elenco completo delle
                                            relazioni.
                                        </p>
                                        <p>
                                            <a href="/contatti" rel="noopener">
                                                Contattatemi
                                            </a>{' '}
                                            per parlare di un vostro progetto o
                                            di montagna!
                                        </p>
                                    </BasicHtmlStyles>
                                </TextConstraint>
                            </Details>
                        </Content>
                        <Image>
                            <img
                                src={image}
                                alt="Matteo Leoni"
                                width={800}
                                height={800}
                            />
                        </Image>
                    </InnerContainer>
                </StyledContainer>
            </Body>
        </Html>
    );
}

const StyledContainer = styled(Container)`
    height: calc(100% - var(--header-height));
    overflow-y: auto;
    ${hideScrollbar}
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const InnerContainer = styled.div`
    position: relative;
    top: calc(0px - calc(var(--header-height) / 2));
    display: flex;
    gap: calc(var(--space-unit) * 4);
    @media ${device.mobileAndTablet} {
        flex-direction: column;
        max-width: 80vw;
        margin: 0 auto;
    }
    @media ${device.mobile} {
        gap: calc(var(--space-unit) * 1);
    }
    @media ${device.onlyTablet} {
        gap: calc(var(--space-unit) * 2);
    }
`;

const Content = styled.main`
    @media ${device.mobileAndTablet} {
        order: 2;
    }
`;
const Image = styled.aside`
    img {
        width: 35vh;
        height: 35vh;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        aspect-ratio: 1/ 1;
        @media ${device.mobileAndTablet} {
            width: 20vmax;
            height: 20vmax;
        }
    }
    @media ${device.mobileAndTablet} {
        order: 1;
        align-self: center;
    }
`;

const handAnimation = keyframes`
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
    margin-left: 0.1em;
    @media ${device.noReduceMotion} {
        animation-name: ${handAnimation};
        animation-duration: 1.2s;
        animation-delay: 1s;
        transform-origin: 70% 70%;
    }
`;

const StyledPageTitle = styled.h1`
    ${headingsStyles};
    font-size: clamp(2rem, 4vmax, 5rem);
    margin-bottom: 0.25em;
`;

const faderCommonStyles = css`
    content: '';
    display: block;
    position: absolute;
    left: 0;
    width: 100%;
    height: 0.3em;
    z-index: 1;
`;

const PageSubTitle = styled.h2`
    font-size: var(--font-size-medium);
    font-weight: 700;
    display: flex;
    align-items: flex-start;
    gap: 0.25em;
    white-space: nowrap;
    height: 1.5rem;
    line-height: 1.5rem;
    overflow: hidden;
    position: relative;
    ::after {
        ${faderCommonStyles};
        top: 0;
        background: linear-gradient(
            to bottom,
            var(--color-background) 0%,
            transparent 100%
        );
    }
    ::before {
        ${faderCommonStyles};
        bottom: -0.2em;
        background: linear-gradient(
            to top,
            var(--color-background) 0%,
            transparent 100%
        );
    }
    @media ${device.mobile} {
        font-size: var(--font-size-base);
    }
`;

const PageSubTitleWhat = styled.span`
    color: var(--color-primary);
    height: 1.5rem;
    svg {
        height: 0.8em;
        margin-right: 0.15em;
    }
`;

const whatAnimation = keyframes`
    0%    { transform: translateY(0) }
    12.5% { transform: translateY(-1.5rem) }
    25%   { transform: translateY(-3rem) }
    37.5% { transform: translateY(-4.5rem) }
    50%   { transform: translateY(-6rem) }
    62.5% { transform: translateY(-7.5rem) }
    75%   { transform: translateY(-9rem) }
    87.5% { transform: translateY(-10.5rem) }
    100%  { transform: translateY(-12rem) }
`;

const PageTitleWhatWrapper = styled.span`
    display: flex;
    flex-direction: column;
    @media ${device.noReduceMotion} {
        animation-name: ${whatAnimation};
        animation-duration: 16s;
        animation-delay: 2s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
    }
`;

const Comma = styled.span`
    ${visuallyHidden}
`;

const TextConstraint = styled.div`
    max-width: 55ch;
`;

const Intro = styled.p`
    font-weight: 700;
    font-size: clamp(1.2rem, 2vmax, 2rem);
    line-height: 1.4;
    margin-top: calc(var(--space-unit) * 2);
    margin-bottom: calc(var(--space-unit) * 2);
    @media ${device.mobile} {
        margin-top: calc(var(--space-unit) * 1);
        margin-bottom: 0;
    }
`;

const SummaryCloseText = styled.span``;
const SummaryOpenText = styled.span``;

const Details = styled.details`
    position: absolute;
    &:not([open]) ${SummaryCloseText} {
        display: none;
    }
    &:not([open]) ${SummaryOpenText} {
        display: initial;
    }
    &[open] ${SummaryOpenText} {
        display: none;
    }
    &[open] ${SummaryCloseText} {
        display: initial;
    }
    p:first-child {
        margin-top: var(--space-unit);
    }
    padding-bottom: calc(var(--space-unit) * 4);
`;
const Summary = styled.summary`
    cursor: pointer;
    font-size: var(--font-size-base);
    font-weight: 700;
    color: var(--color-primary);
    @media ${device.mobile} {
        font-size: var(--font-size-small);
        margin-top: calc(var(--space-unit) * 1);
        margin-bottom: calc(var(--space-unit) * 1);
    }
`;
