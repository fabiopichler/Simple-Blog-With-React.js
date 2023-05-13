
export interface IPaginationProps extends React.HTMLAttributes<HTMLElement> {
    totalPages: number;
    currentPage: number;
    indexKeyName?: string;
    size?: 'sm' | 'lg';
    align?: 'start' | 'center' | 'end';
    ulProps?: React.HTMLAttributes<HTMLUListElement>;
}
