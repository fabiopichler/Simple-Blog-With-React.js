import { IApiState } from '../../services/api';

export interface IPageContentProps<T> {
    children: React.ReactNode | null | ((data: NonNullable<T>) => React.ReactNode | null);
    state?: IApiState<T>;
    windowTitle?: string | ((data: NonNullable<T>) => string);
}
