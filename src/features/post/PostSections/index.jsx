import React from 'react';
import styled, { css } from 'styled-components';
import { visuallyHidden, device } from '../../../theme';
import PostMenu from '../PostMenu';
import PostBody from '../PostBody';
import PostGallery from '../PostGallery';
import PostGps from '../PostGps';
import PostShare from '../PostShare';
import Container from '../../../components/layout/Container';
import Link from '../../../components/ui/Link';

const Wrapper = styled.div`
    margin-top: calc(var(--space-unit) * 2);
    margin-bottom: calc(var(--space-unit) * 4);
    width: 100vw;
    overflow: hidden;
    @media print {
        margin: 0;
        max-width: 21cm;
    }
    @media ${device.desktop} {
        margin-top: calc(var(--space-unit) * 4);
    }
`;

const PostSectionTitle = styled.h2`
    margin-bottom: var(--space-unit);
    ${(props) =>
        props.hide &&
        css`
            ${visuallyHidden};
            @media print {
                display: none;
            }
        `}
`;

const PostSectionTitleLink = styled(Link)`
    padding-top: calc(var(--space-unit) * 6);
    margin-top: calc(var(--space-unit) * -6);
    scroll-margin-top: 120px;
`;

const PostSection = styled.section`
    padding-bottom: calc(var(--space-unit) * 6);
    ${(props) =>
        props.id !== 'relazione' &&
        css`
            @media print {
                display: none;
            }
        `}
    ${(props) =>
        props.id === 'condividi' &&
        css`
            min-height: 20rem;
        `}
`;

export default function PostSections({ post }) {
    const { gps } = post;
    const sections = [
        {
            id: 'relazione',
            title: 'Relazione',
            content: <PostBody post={post} />,
        },
        {
            id: 'foto',
            title: 'Galleria fotografica',
            content: <PostGallery post={post} />,
        },
        {
            id: 'mappa',
            title: 'Mappa e tracce',
            content: gps.hasTracks ? <PostGps post={post} /> : null,
        },
        {
            id: 'condividi',
            title: 'Stampa e condividi',
            content: <PostShare post={post} />,
        },
    ];
    return (
        <>
            <PostMenu sections={sections} />
            <Wrapper>
                {sections.map((section, i) =>
                    section.content ? (
                        <PostSection
                            key={i}
                            className="js-postSection"
                            id={section.id}
                            data-step={section.id}
                        >
                            <Container as="header">
                                <PostSectionTitle
                                    hide={section.id === 'relazione'}
                                >
                                    <PostSectionTitleLink
                                        inherit
                                        noUnderline
                                        id={section.id}
                                    >
                                        {section.title}
                                    </PostSectionTitleLink>
                                </PostSectionTitle>
                            </Container>
                            {section.content}
                        </PostSection>
                    ) : null,
                )}
            </Wrapper>
        </>
    );
}
