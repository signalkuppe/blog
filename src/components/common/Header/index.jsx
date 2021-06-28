import React from 'react';
import styled from 'styled-components';
import { visuallyHidden } from '../../../theme';
import Logo from '../../ui/Logo';
import Link from '../../ui/Link';
import vars from '../../../vars';
import MainMenu from '../MainMenu';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--space-unit);
    height: 100%;
`;

const StyledH1 = styled.h1`
    color: var(--color-text-light-accent);
    width: var(--logo-width);
    margin: 0;
    transform: translateY(0.27rem);
`;

const LogoText = styled.span`
    ${visuallyHidden}
`;

const LogoLink = styled(Link)`
    display: grid;
    place-items: center;
`;

export default function Header({ route }) {
    return (
        <HeaderContainer>
            <StyledH1>
                <LogoLink
                    inherit
                    noUnderline
                    href={vars.websiteUrl}
                    title="Torna alla homepage"
                >
                    <LogoText>{vars.siteName}</LogoText>
                    <Logo />
                </LogoLink>
            </StyledH1>
            <MainMenu route={route} />
        </HeaderContainer>
    );
}
