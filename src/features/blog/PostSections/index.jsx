import React from 'react';
import styled, { css } from 'styled-components';
import PostMenu from '../PostMenu';
import PostBody from '../PostBody';
import Container from '../../../components/layout/Container';
import Link from '../../../components/ui/Link';
import LoremIpsum from '../../../components/ui/LoremIpsum';

const StyledContainer = styled(Container)`
    margin-top: calc(var(--space-unit) * 2);
    margin-bottom: calc(var(--space-unit) * 4);
`;

const PostSectionTitle = styled.h2`
    ${(props) =>
        props.hide &&
        css`
            opacity: 0;
        `}
`;

const PostSectionTitleLink = styled(Link)`
    padding-top: calc(var(--space-unit) * 6);
    margin-top: calc(var(--space-unit) * -6);
`;

const PostSection = styled.section`
    margin-bottom: calc(var(--space-unit) * 6);
    max-width: 70ch;
`;

export default function PostSections({ post }) {
    const { body } = post;
    const sections = [
        {
            id: 'relazione',
            title: 'Relazione',
            content: <PostBody body={body} />,
        },
        {
            id: 'foto',
            title: 'Galleria fotografica',
            content: <LoremIpsum times={3} />,
        },
        {
            id: 'mappa',
            title: 'Mappa e tracce',
            content: <LoremIpsum times={3} />,
        },
        {
            id: 'condividi',
            title: 'Stampa e condividi',
            content: <LoremIpsum times={3} />,
        },
    ];
    return (
        <>
            <PostMenu sections={sections} />
            <StyledContainer>
                {sections.map((section, i) => (
                    <PostSection
                        key={i}
                        className="js-postSection"
                        data-step={section.id}
                    >
                        <PostSectionTitle hide={section.id === 'relazione'}>
                            <PostSectionTitleLink
                                inherit
                                noUnderline
                                id={section.id}
                            >
                                {section.title}
                            </PostSectionTitleLink>
                        </PostSectionTitle>
                        {section.content}
                    </PostSection>
                ))}
            </StyledContainer>
        </>
    );
}
