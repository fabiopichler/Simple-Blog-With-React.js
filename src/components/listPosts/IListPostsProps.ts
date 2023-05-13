import { IPaginatorPage } from '../../interfaces/IPaginatorPage';

export interface IListPostsProps<T> {
    data: IPaginatorPage<T>;
}
