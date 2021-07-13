import React from 'react';
import styled, { css } from 'styled-components';
import PostMenu from '../PostMenu';
import Container from '../../../components/layout/Container';
import Link from '../../../components/ui/Link';
import VerticalSpace from '../../../components/ui/VerticalSpace';
import { visuallyHidden, headingsSize } from '../../../theme';

const StyledContainer = styled(Container)`
    margin-top: calc(var(--space-unit) * 4);
    margin-bottom: calc(var(--space-unit) * 8);
`;

const PostSectionTitle = styled.h2`
    ${(props) =>
        props.hide &&
        css`
            ${visuallyHidden}
        `}
`;

const PostSectionTitleLink = styled(Link)`
    padding-top: calc(var(--space-unit) * 4);
    margin-top: calc(var(--space-unit) * -4);
    /** scroll-margin-top seems buggy on safari :( */
`;

const PostSection = styled.section`
    margin-bottom: calc(var(--space-unit) * 6);
    max-width: 70ch;
    h3 {
        font-size: ${headingsSize.h2};
    }
`;

export default function PostContent({ post }) {
    return (
        <>
            <PostMenu />
            <VerticalSpace size={3} />
            <StyledContainer forwardedAs="section">
                <PostSection className="js-postSection">
                    <PostSectionTitle hide>
                        <PostSectionTitleLink
                            inherit
                            noUnderline
                            name="relazione"
                        >
                            Relazione
                        </PostSectionTitleLink>
                    </PostSectionTitle>
                    <div dangerouslySetInnerHTML={{ __html: post.body }} />
                </PostSection>
                <PostSection className="js-postSection">
                    <PostSectionTitle>
                        <PostSectionTitleLink inherit noUnderline name="foto">
                            Foto
                        </PostSectionTitleLink>
                    </PostSectionTitle>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aliquam, suscipit expedita! Totam libero, dolorum
                        ex animi, aspernatur, sequi iste reiciendis ut aliquid
                        molestiae adipisci corrupti? Labore quo aspernatur sequi
                        magni. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Aliquam, suscipit expedita! Totam
                        libero, dolorum ex animi, aspernatur, sequi iste
                        reiciendis ut aliquid molestiae adipisci corrupti?
                        Labore quo aspernatur sequi magni. Lorem ipsum dolor sit
                        amet consectetur, adipisicing elit. Aliquam, suscipit
                        expedita! Totam libero, dolorum ex animi, aspernatur,
                        sequi iste reiciendis ut aliquid molestiae adipisci
                        corrupti? Labore quo aspernatur sequi magni. Lorem ipsum
                        dolor sit amet consectetur, adipisicing elit. Aliquam,
                        suscipit expedita! Totam libero, dolorum ex animi,
                        aspernatur, sequi iste reiciendis ut aliquid molestiae
                        adipisci corrupti? Labore quo aspernatur sequi magni.
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aliquam, suscipit expedita! Totam libero, dolorum
                        ex animi, aspernatur, sequi iste reiciendis ut aliquid
                        molestiae adipisci corrupti? Labore quo aspernatur sequi
                        magni. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Aliquam, suscipit expedita! Totam
                        libero, dolorum ex animi, aspernatur, sequi iste
                        reiciendis ut aliquid molestiae adipisci corrupti?
                        Labore quo aspernatur sequi magni. Lorem ipsum dolor sit
                        amet consectetur, adipisicing elit. Aliquam, suscipit
                        expedita! Totam libero, dolorum ex animi, aspernatur,
                        sequi iste reiciendis ut aliquid molestiae adipisci
                        corrupti? Labore quo aspernatur sequi magni.
                    </p>
                </PostSection>
                <PostSection className="js-postSection">
                    <PostSectionTitle>
                        <PostSectionTitleLink inherit noUnderline name="mappa">
                            Mappa
                        </PostSectionTitleLink>
                    </PostSectionTitle>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aliquam, suscipit expedita! Totam libero, dolorum
                        ex animi, aspernatur, sequi iste reiciendis ut aliquid
                        molestiae adipisci corrupti? Labore quo aspernatur sequi
                        magni. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Aliquam, suscipit expedita! Totam
                        libero, dolorum ex animi, aspernatur, sequi iste
                        reiciendis ut aliquid molestiae adipisci corrupti?
                        Labore quo aspernatur sequi magni. Lorem ipsum dolor sit
                        amet consectetur, adipisicing elit. Aliquam, suscipit
                        expedita! Totam libero, dolorum ex animi, aspernatur,
                        sequi iste reiciendis ut aliquid molestiae adipisci
                        corrupti? Labore quo aspernatur sequi magni. Lorem ipsum
                        dolor sit amet consectetur, adipisicing elit. Aliquam,
                        suscipit expedita! Totam libero, dolorum ex animi,
                        aspernatur, sequi iste reiciendis ut aliquid molestiae
                        adipisci corrupti? Labore quo aspernatur sequi magni.
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aliquam, suscipit expedita! Totam libero, dolorum
                        ex animi, aspernatur, sequi iste reiciendis ut aliquid
                        molestiae adipisci corrupti? Labore quo aspernatur sequi
                        magni. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Aliquam, suscipit expedita! Totam
                        libero, dolorum ex animi, aspernatur, sequi iste
                        reiciendis ut aliquid molestiae adipisci corrupti?
                        Labore quo aspernatur sequi magni. Lorem ipsum dolor sit
                        amet consectetur, adipisicing elit. Aliquam, suscipit
                        expedita! Totam libero, dolorum ex animi, aspernatur,
                        sequi iste reiciendis ut aliquid molestiae adipisci
                        corrupti? Labore quo aspernatur sequi magni.
                    </p>
                </PostSection>
                <PostSection className="js-postSection">
                    <PostSectionTitle>
                        <PostSectionTitleLink
                            inherit
                            noUnderline
                            name="condividi"
                        >
                            Condividi
                        </PostSectionTitleLink>
                    </PostSectionTitle>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aliquam, suscipit expedita! Totam libero, dolorum
                        ex animi, aspernatur, sequi iste reiciendis ut aliquid
                        molestiae adipisci corrupti? Labore quo aspernatur sequi
                        magni. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Aliquam, suscipit expedita! Totam
                        libero, dolorum ex animi, aspernatur, sequi iste
                        reiciendis ut aliquid molestiae adipisci corrupti?
                        Labore quo aspernatur sequi magni. Lorem ipsum dolor sit
                        amet consectetur, adipisicing elit. Aliquam, suscipit
                        expedita! Totam libero, dolorum ex animi, aspernatur,
                        sequi iste reiciendis ut aliquid molestiae adipisci
                        corrupti? Labore quo aspernatur sequi magni. Lorem ipsum
                        dolor sit amet consectetur, adipisicing elit. Aliquam,
                        suscipit expedita! Totam libero, dolorum ex animi,
                        aspernatur, sequi iste reiciendis ut aliquid molestiae
                        adipisci corrupti? Labore quo aspernatur sequi magni.
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Aliquam, suscipit expedita! Totam libero, dolorum
                        ex animi, aspernatur, sequi iste reiciendis ut aliquid
                        molestiae adipisci corrupti? Labore quo aspernatur sequi
                        magni. Lorem ipsum dolor sit amet consectetur,
                        adipisicing elit. Aliquam, suscipit expedita! Totam
                        libero, dolorum ex animi, aspernatur, sequi iste
                        reiciendis ut aliquid molestiae adipisci corrupti?
                        Labore quo aspernatur sequi magni. Lorem ipsum dolor sit
                        amet consectetur, adipisicing elit. Aliquam, suscipit
                        expedita! Totam libero, dolorum ex animi, aspernatur,
                        sequi iste reiciendis ut aliquid molestiae adipisci
                        corrupti? Labore quo aspernatur sequi magni.
                    </p>
                </PostSection>
            </StyledContainer>
        </>
    );
}
