import React from 'react';
import styled, { css } from 'styled-components';
import { visuallyHidden, device } from '../../../theme';
import Logo from '../../ui/Logo';
import vars from '../../../vars';
import MainMenu from '../MainMenu';

export default function Header({ route, ...props }) {
    const isFronPage = route.name === 'index';
    let logo;
    const logoLink = (
        <LogoLink href="/" title="Torna alla homepage">
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
        <HeaderContainer id="js-header" {...props}>
            {logo}
            <Nav>
                <MainMenu route={route} />
            </Nav>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--space-unit);
    height: var(--header-height);
`;

const logostyles = css`
    width: 8rem;
    margin: 0;
    transform: translateY(0.2rem);
    flex-shrink: 0;
    @media ${device.atLeastTablet} {
        width: 9rem;
    }
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
    transition: transform 0.2s ease-in;
    :hover {
        transform: translateY(-0.15em);
    }
`;

const LogoText = styled.span`
    ${visuallyHidden}
`;

const LogoLink = styled.a`
    display: grid;
    place-items: center;
`;

const Nav = styled.nav`
    @media ${device.mobile} {
        margin-left: 1rem;
    }
`;
