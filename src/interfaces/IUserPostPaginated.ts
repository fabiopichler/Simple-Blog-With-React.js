import { IPaginatorPage } from './IPaginatorPage';
import { IPost } from './IPost';
import { IUser } from './IUser';

export interface IUserPostPaginated {
    user: IUser;
    posts: IPaginatorPage<IPost>;
}
