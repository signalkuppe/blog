import React from 'react';
import styled, { css } from 'styled-components';
import { visuallyHidden, device } from '../../../theme';
import Logo from '../../ui/Logo';
import Link from '../../ui/Link';
import vars from '../../../vars';
import MainMenu from '../MainMenu';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--space-unit);
    height: var(--header-height);
`;

const logostyles = css`
    width: var(--logo-width);
    margin: 0;
    transform: translateY(0.2rem);
`;

const H1LogoContainer = styled.h1`
    ${logostyles};
`;

const PlainLogoContainer = styled.div`
    ${logostyles};
`;

const StyledLogo = styled(Logo)`
    fill: var(--color-text-light-accent);
    will-change: transform;
    transition: transform 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    :hover {
        transform: rotate(-2.5deg);
    }
`;

const LogoText = styled.span`
    ${visuallyHidden}
`;

const LogoLink = styled(Link)`
    display: grid;
    place-items: center;
`;

export default function Header({ route }) {
    const isFronPage = route.name === 'index';
    let logo;
    const logoLink = (
        <LogoLink
            inherit
            noUnderline
            href={vars.websiteUrl}
            title="Torna alla homepage"
        >
            <StyledLogo />
            <LogoText>{vars.siteName}</LogoText>
        </LogoLink>
    );

    if (isFronPage) {
        logo = <H1LogoContainer>{logoLink}</H1LogoContainer>;
    } else {
        logo = <PlainLogoContainer>{logoLink}</PlainLogoContainer>;
    }

    return (
        <HeaderContainer id="js-header">
            {logo}
            <MainMenu route={route} />
        </HeaderContainer>
    );
}
