import clsx from 'clsx';

import { useRequestUrl } from '../../routing/requestUrl';
import { PaginationItem } from "./paginationItem/PaginationItem";
import { IPaginationProps } from "./IPaginationProps";

export const Pagination: React.FC<IPaginationProps> = ({
    totalPages,
    currentPage,
    indexKeyName = 'index',
    size,
    align,
    ulProps = {},
    ...rest
}) => {

    const { requestUrl } = useRequestUrl();

    if (totalPages < 2)
        return null;

    const before = currentPage - 2;
    const after = currentPage + 2;

    const links = () => {
        const list = [];

        for (let i = 2; i < totalPages; ++i) {
            if (i === currentPage) {
                list.push(
                    <PaginationItem key={i} active>{i}</PaginationItem>
                );

            } else if (before <= i && i <= after) {
                list.push(
                    <PaginationItem key={i} to={requestUrl({ [indexKeyName]: i })}>
                        {i}
                    </PaginationItem>
                );
            }
        }

        return list;
    }

    return (
        <nav {...rest}>
            <ul
                {...ulProps}
                className={clsx(
                    "pagination",
                    {
                        'pagination-sm': size === 'sm',
                        'pagination-lg': size === 'lg',
                        'justify-content-start': align === 'start',
                        'justify-content-center': align === 'center',
                        'justify-content-end': align === 'end',
                    },
                    ulProps?.className
                )}
            >
                {currentPage > 1 ? (
                    <>
                        <PaginationItem to={requestUrl({ [indexKeyName]: currentPage - 1 })}>&laquo;</PaginationItem>
                        <PaginationItem to={requestUrl({ [indexKeyName]: 1 })}>1</PaginationItem>
                    </>
                ) : (
                    <>
                        <PaginationItem>&laquo;</PaginationItem>
                        <PaginationItem active>1</PaginationItem>
                    </>
                )}

                {before > 2 ? (
                    <PaginationItem>...</PaginationItem>
                ) : null}

                {links()}

                {after < totalPages - 1 ? (
                    <PaginationItem>...</PaginationItem>
                ) : null}

                {currentPage === totalPages ? (
                    <>
                        <PaginationItem active>{totalPages}</PaginationItem>
                        <PaginationItem>&raquo;</PaginationItem>
                    </>
                ) : (
                    <>
                        <PaginationItem to={requestUrl({ [indexKeyName]: totalPages })}>
                            {totalPages}
                        </PaginationItem>

                        <PaginationItem to={requestUrl({ [indexKeyName]: currentPage + 1 })}>
                            &raquo;
                        </PaginationItem>
                    </>
                )}
            </ul>
        </nav>
    );
};
