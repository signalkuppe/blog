import React from 'react';
import styled from 'styled-components';
import { Script } from 'pequeno';
import vars from '../../../vars';
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

const StyledLink = styled.a`
    color: var(--color-text-light-accent);
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
                    <VerticalSpace size={2} />
                    <span>Seguimi su</span>
                    <VerticalSpace size={0.5} />
                    <StyledUl>
                        <li>
                            <StyledLink
                                href={vars.facebook}
                                title="Seguimi su Facebook"
                            >
                                <Icon icon={Facebook} xl />
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink
                                href={vars.twitter}
                                title="Seguimi su Twitter"
                            >
                                <Icon icon={Twitter} xl />
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink
                                href={vars.instagram}
                                title="Seguimi su Instagram"
                            >
                                <Icon icon={Instagram} xl />
                            </StyledLink>
                        </li>
                        <li>
                            <StyledLink
                                href={vars.github}
                                title="La mia pagina su Github"
                                id="js-lastFocusableElement"
                            >
                                <Icon icon={Github} xl />
                            </StyledLink>
                        </li>
                    </StyledUl>
                    <VerticalSpace size={2} />
                    <p>
                        Questo sito è stato realizzato con{' '}
                        <a href="https://github.com/signalkuppe/pequeno">
                            Pequeño
                        </a>
                    </p>
                    <VerticalSpace size={2} />
                    <span id="js-year"></span> -{' '}
                    <StyledLink href={vars.websiteUrl}>
                        signalkuppe.com
                    </StyledLink>
                    , contenuti pubblicati sotto licenza{' '}
                    <StyledLink
                        href="https://choosealicense.com/licenses/agpl-3.0/"
                        title="Leggi la licenza"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GNU AGPLv3
                    </StyledLink>
                </div>
            </DefaultPageLayout>
            <Script>{client}</Script>
        </BaseLayout>
    );
}
