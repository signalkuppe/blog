import React from 'react';
import styled, { css } from 'styled-components';
import PostMenu from '../PostMenu';
import PostBody from '../PostBody';
import PostGallery from '../PostGallery';
import PostGps from '../PostGps';
import Container from '../../../components/layout/Container';
import Link from '../../../components/ui/Link';
import LoremIpsum from '../../../components/ui/LoremIpsum';

const StyledContainer = styled(Container)`
    margin-top: calc(var(--space-unit) * 2);
    margin-bottom: calc(var(--space-unit) * 4);
`;

const PostSectionTitle = styled.h2`
    margin-bottom: var(--space-unit);
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
    const { body, gallery, gps } = post;
    const sections = [
        {
            id: 'relazione',
            title: 'Relazione',
            content: <PostBody body={body} />,
        },
        {
            id: 'foto',
            title: 'Galleria fotografica',
            content: <PostGallery gallery={gallery} />,
        },
        {
            id: 'mappa',
            title: 'Mappa e tracce',
            content: gps.hasTracks ? <PostGps gps={gps} /> : null,
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
                {sections.map((section, i) =>
                    section.content ? (
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
                    ) : null,
                )}
            </StyledContainer>
        </>
    );
}
