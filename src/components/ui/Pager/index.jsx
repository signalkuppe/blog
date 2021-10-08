import React from 'react';
import styled from 'styled-components';
import List from '../../../components/ui/List';
import Link from '../../../components/ui/Link';
import Icon from '../../../components/ui/Icon';
import LeftIcon from '../../../public/icons/ChevronLeft.svg';
import RightIcon from '../../../public/icons/ChevronRight.svg';

const StyledList = styled(List)`
    display: flex;
    align-items: center;
    font-size: var(--font-size-medium);
    > * + * {
        margin-left: 1em;
    }
`;

const StyledLi = styled.li`
    display: flex;
    align-items: center;
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

const Test = styled.div`
    color: yellow;
`;

export default function Pager({ pagination }) {
    const { next, prev, pages, page, total } = pagination;
    if (!pages) {
        return null;
    } else {
        return (
            <>
                <StyledList reset>
                    {prev && (
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
                    )}
                    <StyledLi>
                        <span>Pagina</span>
                        <strong>{page}</strong>
                        <span>di</span>
                        <span>{total}</span>
                    </StyledLi>
                    {next && (
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
                    )}
                </StyledList>
            </>
        );
    }
}
