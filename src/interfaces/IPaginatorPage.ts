
export interface IPaginatorPage<T> {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    contentSize: number;
    content: T[];
}
