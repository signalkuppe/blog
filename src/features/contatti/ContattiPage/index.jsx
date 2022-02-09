import React from 'react';
import styled from 'styled-components';
import vars from '../../../vars';
import PageTitle from '../../../components/ui/PageTitle';
import BaseLayout from '../../../components/layout/Base';
import DefaultPageLayout from '../../../components/layout/DefaultPageLayout';
import Head from '../../../components/common/Head';
import List from '../../../components/ui/List';
import Link from '../../../components/ui/Link';
import Icon from '../../../components/ui/Icon';
import VerticalSpace from '../../../components/ui/VerticalSpace';
import Facebook from '../../../public/icons/Facebook.svg';
import Twitter from '../../../public/icons/Twitter.svg';
import Instagram from '../../../public/icons/Instagram.svg';
import Github from '../../../public/icons/Github.svg';
import ContattiForm from '../ContattiForm';

const Description = styled.p`
    margin: 0;
`;

const PanelFooter = styled.div`
    font-size: var(--font-size-x-small);
    height: 8rem;
`;

const FooterLink = styled(Link)`
    color: var(--color-text-light-accent);
`;

export default function PortfolioPage({ route }) {
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

                <PanelFooter>
                    <span id="js-year"></span> -{' '}
                    <FooterLink inherit href={vars.websiteUrl}>
                        signalkuppe.com
                    </FooterLink>
                    <VerticalSpace size={0.25} />
                    Contenuti pubblicati sotto licenza{' '}
                    <FooterLink
                        inherit
                        href="https://choosealicense.com/licenses/agpl-3.0/"
                        title="Leggi la licenza"
                        target="_blank"
                        rel="noreferrer"
                    >
                        GNU AGPLv3
                    </FooterLink>
                    <VerticalSpace size={1.25} />
                    <List reset inline gap={0.5}>
                        <li>
                            <FooterLink
                                noUnderline
                                href={vars.facebook}
                                title="Seguimi su Facebook"
                            >
                                <Icon icon={Facebook} />
                            </FooterLink>
                        </li>
                        <li>
                            <FooterLink
                                noUnderline
                                href={vars.twitter}
                                title="Seguimi su Twitter"
                            >
                                <Icon icon={Twitter} />
                            </FooterLink>
                        </li>
                        <li>
                            <FooterLink
                                noUnderline
                                href={vars.instagram}
                                title="Seguimi su Instagram"
                            >
                                <Icon icon={Instagram} />
                            </FooterLink>
                        </li>
                        <li>
                            <FooterLink
                                noUnderline
                                href={vars.github}
                                title="La mia pagina su Github"
                                id="js-lastFocusableElement"
                            >
                                <Icon icon={Github} />
                            </FooterLink>
                        </li>
                    </List>
                </PanelFooter>
            </DefaultPageLayout>
        </BaseLayout>
    );
}
