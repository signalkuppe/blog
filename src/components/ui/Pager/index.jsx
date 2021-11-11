import React from 'react';
import styled, { css } from 'styled-components';
import List from '../../../components/ui/List';
import Link from '../../../components/ui/Link';
import Icon from '../../../components/ui/Icon';
import FirstIcon from '../../../public/icons/DoubleChevronLeft.svg';
import LeftIcon from '../../../public/icons/ChevronLeft.svg';
import RightIcon from '../../../public/icons/ChevronRight.svg';
import LastIcon from '../../../public/icons/DoubleChevronRight.svg';

const StyledList = styled(List)`
    display: flex;
    align-items: center;
`;

const StyledLi = styled.li`
    display: flex;
    align-items: center;
    ${(props) =>
        props.firstPage &&
        css`
            margin-right: 0.5em;
        `}
    ${(props) =>
        props.lastPage &&
        css`
            margin-left: 0.5em;
        `}
`;

const Page = styled.div`
    margin: 0 0.75em;
    > * + * {
        margin-left: 0.2em;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 0.25em;
    border: 4px solid var(--color-secondary);
    border-radius: 8px;
    &:hover {
        background: var(--color-secondary);
    }
`;

export default function Pager({ pagination, ...props }) {
    const { next, prev, pages, page, total } = pagination;
    const firstPage = pages[0];
    const lastPage = pages[total - 1];
    if (!pages) {
        return null;
    } else {
        return (
            <StyledList reset {...props}>
                {prev && (
                    <>
                        <StyledLi firstPage>
                            <StyledLink
                                href={firstPage}
                                noUnderline
                                inherit
                                title="Prima pagina"
                            >
                                <Icon icon={FirstIcon} />
                            </StyledLink>
                        </StyledLi>
                        <StyledLi>
                            <StyledLink
                                href={prev}
                                noUnderline
                                inherit
                                title="Pagina precedente"
                            >
                                <Icon icon={LeftIcon} />
                            </StyledLink>
                        </StyledLi>
                    </>
                )}
                <StyledLi>
                    <Page>
                        <span>Pagina</span>
                        <strong>{page}</strong>
                        <span>di</span>
                        <span>{total}</span>
                    </Page>
                </StyledLi>
                {next && (
                    <>
                        <StyledLi>
                            <StyledLink
                                href={next}
                                noUnderline
                                inherit
                                title="Pagina successiva"
                            >
                                <Icon icon={RightIcon} />
                            </StyledLink>
                        </StyledLi>
                        <StyledLi lastPage>
                            <StyledLink
                                href={lastPage}
                                noUnderline
                                inherit
                                title="Ultima pagina"
                            >
                                <Icon icon={LastIcon} />
                            </StyledLink>
                        </StyledLi>
                    </>
                )}
            </StyledList>
        );
    }
}
