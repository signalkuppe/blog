import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Script } from 'pequeno';
import { device } from '../../../theme';
import Container from '../../../components/layout/Container';
import MouseIcon from '../../../components/ui/Icon/icons/Mouse.svg';
import DownIcon from '../../../components/ui/Icon/icons/ChevronDown.svg';
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
    height: calc(100vh - var(--header-height));
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const HeroSpacer = styled.div`
    margin-left: var(--font-size-x-large);
    margin-right: calc(var(--space-unit) * 1.5);
`;

const Date = styled.time`
    ${commonMetaStyles};
    font-size: clamp(var(--font-size-small), var(--font-size-base), 2vmax);
    display: block;
`;

const Category = styled.span`
    ${commonMetaStyles};
    display: block;
    font-size: clamp(var(--font-size-medium), var(--font-size-x-large), 2vmax);
    font-weight: 700;
    margin-left: -1em;
    margin-bottom: var(--space-unit);
`;

const StyledPostCategoryIcon = styled(PostCategoryIcon)`
    width: 1em;
    height: 1em;
    transform: translateX(-0.1em);
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
