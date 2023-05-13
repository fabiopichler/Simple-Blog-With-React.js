import { IUser } from './IUser';

export interface IComment {
    id: number;
    authorName: string;
    body: string;
    user: IUser | null;
    createdAt: string;
    createdAtFormatted: string;
}
