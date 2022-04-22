import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import vars from '../../../vars';
import { linksStyles, boldStyles } from '../../../theme';
import PageTitle from '../../../components/ui/PageTitle';
import BaseLayout from '../../../components/layout/Base';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import Head from '../../../components/common/Head';
import Icon from '../../../components/ui/Icon';
import VerticalSpace from '../../../components/ui/VerticalSpace';
import Facebook from '../../../public/icons/Facebook.svg';
import Twitter from '../../../public/icons/Twitter.svg';
import Instagram from '../../../public/icons/Instagram.svg';
import Github from '../../../public/icons/Github.svg';
import Rss from '../../../public/icons/Rss.svg';
import ContattiForm from '../ContattiForm';
import client from './index.client';

const Description = styled.p`
    margin: 0;
`;

const StyledUl = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--space-unit);
    list-style: none;
`;

const WhiteLink = styled.a`
    font-weight: 500;
    color: var(--color-text-light-accent);
`;

const RegularLink = styled.a`
    ${linksStyles}
`;

const Bold = styled.strong`
    ${boldStyles}
`;

export default function ContattiPage({ route }) {
    let title = 'Inviami un messaggio';
    let description =
        'Inviami un messaggio per parlare di un vostro progetto o di montagna';
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={title}
                    slogan={vars.siteName}
                    description={description}
                />
            }
        >
            <DefaultPageLayout
                title={<PageTitle small>{title}</PageTitle>}
                description={<Description>{description}</Description>}
            >
                <ContattiForm />

                <div>
                    <VerticalSpace size={4} />
                    <Bold>Seguimi su</Bold>
                    <VerticalSpace size={0.5} />
                    <StyledUl>
                        <li>
                            <WhiteLink
                                href={vars.facebook}
                                title="Seguimi su Facebook"
                            >
                                <Icon icon={Facebook} xl />
                            </WhiteLink>
                        </li>
                        <li>
                            <WhiteLink
                                href={vars.twitter}
                                title="Seguimi su Twitter"
                            >
                                <Icon icon={Twitter} xl />
                            </WhiteLink>
                        </li>
                        <li>
                            <WhiteLink
                                href={vars.instagram}
                                title="Seguimi su Instagram"
                            >
                                <Icon icon={Instagram} xl />
                            </WhiteLink>
                        </li>
                        <li>
                            <WhiteLink
                                href={vars.github}
                                title="La mia pagina su Github"
                                id="js-lastFocusableElement"
                            >
                                <Icon icon={Github} xl />
                            </WhiteLink>
                        </li>
                    </StyledUl>
                    <VerticalSpace size={2} />
                    <p>
                        <RegularLink href={`${vars.websiteUrl}/rss.sxml`}>
                            <Icon icon={Rss} left />
                            Feed RSS della relazioni
                        </RegularLink>
                    </p>
                    <VerticalSpace size={2} />
                    <p>
                        Questo sito è stato realizzato con{' '}
                        <RegularLink href="https://github.com/signalkuppe/pequeno">
                            Pequeño
                        </RegularLink>
                    </p>
                    <VerticalSpace size={2} />
                    <span id="js-year"></span> -{' '}
                    <WhiteLink href={vars.websiteUrl}>
                        signalkuppe.com
                    </WhiteLink>
                    , contenuti pubblicati sotto licenza{' '}
                    <WhiteLink
                        href="https://choosealicense.com/licenses/agpl-3.0/"
                        title="Leggi la licenza"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GNU AGPLv3
                    </WhiteLink>
                </div>
            </DefaultPageLayout>
            <Script>{client}</Script>
        </BaseLayout>
    );
}
