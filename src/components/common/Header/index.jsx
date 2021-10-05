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
    padding: var(--space-unit);
`;

const logostyles = css`
    width: var(--logo-width);
    margin: 0;
    transform: translateY(-0.6rem);
`;

const H1LogoContainer = styled.h1`
    ${logostyles};
`;

const PlainLogoContainer = styled.div`
    ${logostyles};
`;

const StyledLogo = styled(Logo)`
    fill: var(--color-text-light-accent);
    :hover {
        filter: drop-shadow(-5px 0px 20px var(--color-text));
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
