import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Script } from 'pequeno';
import { device } from '../../../theme';
import Container from '../../../components/layout/Container';
import MouseIcon from '../../../public/icons/Mouse.svg';
import DownIcon from '../../../public/icons/ChevronDown.svg';
import PageTitle from '../../../components/ui/PageTitle';
import PostCategoryIcon from '../PostCategoryIcon';
import client from './index.client';

const ShakeY = keyframes`
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1);
  }

  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05);
  }

  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }

  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
`;

const commonMetaStyles = css`
    font-stretch: var(--headings-font-stretch);
    text-transform: uppercase;
    color: var(--color-text-dark-accent);
`;

const Hero = styled.div`
    height: 100vh; /** fixed in js for ios */
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media print {
        height: auto;
        display: block;
    }
`;

const HeroSpacer = styled.div`
    margin-left: var(--space-unit);
    margin-right: calc(var(--space-unit) * 1.5);
    @media ${device.largeDesktop} {
        margin-right: calc(var(--space-unit) * 4);
    }
    @media ${device.largeDesktop} {
        margin-left: var(--logo-width);
    }
    @media print {
        margin: 0;
    }
`;

const Date = styled.time`
    ${commonMetaStyles};
    font-size: clamp(var(--font-size-small), var(--font-size-base), 2vmax);
    display: block;
    @media print {
        display: none;
    }
`;

const Category = styled.span`
    ${commonMetaStyles};
    display: flex;
    align-items: center;
    font-size: clamp(var(--font-size-medium), var(--font-size-x-large), 2vmax);
    font-weight: 700;
    margin-left: -1em;
    margin-bottom: var(--space-unit);
    @media print {
        display: none;
    }
`;

const StyledPostCategoryIcon = styled(PostCategoryIcon)`
    transform: translateX(-0.2em);
`;

const Description = styled.p`
    margin-top: calc(var(--space-unit) * 2);
`;

const ScrollHint = styled.span`
    display: inline-flex;
    flex-direction: column;
    margin-top: 5vmax;
    @media ${device.noReduceMotion} {
        animation: ${ShakeY} 1s linear;
        animation-delay: 1s;
    }
    @media print {
        display: none;
    }
`;

const StyledMouseIcon = styled(MouseIcon)`
    height: 3rem;
`;

const StyledDownIcon = styled(DownIcon)`
    height: 1em;
    margin-top: 0.25em;
`;

export default function PostHero({ post }) {
    const { title, date, dateTime, category, description } = post;
    return (
        <Container as="header">
            <Hero id="js-postHero">
                <HeroSpacer>
                    <Date dateTime={dateTime}>{date}</Date>
                    <Category>
                        <StyledPostCategoryIcon category={category} />
                        {category}
                    </Category>
                    <PageTitle>{title}</PageTitle>
                    <Description>{description}</Description>
                    <ScrollHint aria-hidden="true">
                        <StyledMouseIcon />
                        <StyledDownIcon />
                    </ScrollHint>
                </HeroSpacer>
            </Hero>
            <Script
                libs={[
                    {
                        where: 'body',
                        tag: '<script src="/js/utils.js" />',
                    },
                ]}
            >
                {client}
            </Script>
        </Container>
    );
}
