import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { device } from '../../../theme';
import Container from '../../../components/layout/Container';
import MouseIcon from '../../../public/icons/Mouse.svg';
import DownIcon from '../../../public/icons/ChevronDown.svg';
import PageTitle from '../../../components/ui/PageTitle';
import PostCategoryIcon from '../PostCategoryIcon';

export default function PostHero({ post }) {
    const { title, date, dateTime, category, description } = post;
    return (
        <Hero>
            <Container>
                <HeroSpacer className="print-post-heroSpacer">
                    <Date dateTime={dateTime} className="print-post-date">
                        {date}
                    </Date>
                    <Category className="print-post-category">
                        <StyledPostCategoryIcon category={category} />
                        {category}
                    </Category>
                    <PageTitle className="print-post-title">{title}</PageTitle>
                    <Description className="print-post-description">
                        {description}
                    </Description>
                    <ScrollHint
                        aria-hidden="true"
                        className="print-post-scrollHint"
                    >
                        <StyledMouseIcon />
                        <StyledDownIcon />
                    </ScrollHint>
                </HeroSpacer>
            </Container>
        </Hero>
    );
}

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
    text-transform: uppercase;
    color: var(--color-text-dark-accent);
`;

const Hero = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const HeroSpacer = styled.div`
    margin-left: var(--space-unit);
    margin-right: calc(var(--space-unit) * 1.5);
    @media ${device.onlyTablet} {
        margin-left: calc(var(--space-unit) * 3);
    }
    @media ${device.largeDesktop} {
        margin-left: var(--logo-width);
        margin-right: calc(var(--space-unit) * 4);
    }
`;

const Date = styled.time`
    ${commonMetaStyles};
    font-size: clamp(var(--font-size-x-small), var(--font-size-small), 1.5vmax);
    display: block;
`;

const Category = styled.span`
    ${commonMetaStyles};
    display: flex;
    align-items: center;
    font-size: clamp(var(--font-size-base), var(--font-size-large), 2vmax);
    font-weight: 700;
    margin-left: -1em;
    margin-bottom: var(--space-unit);
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
    align-items: center;
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
    margin-top: 0.25em;
    transform: scale(0.8);
    width: 1.5em;
`;
