import { IUser } from './IUser';
import { IComment } from './IComment';

export interface IPost {
    id: number;
    user: IUser;
    comments: IComment[];
    commentsCount: number;
    postname: string;
    type: string;
    status: string;
    commentStatus: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    createdAtFormatted: string;
    updatedAt: string;
    updatedAtFormatted: string;
}
