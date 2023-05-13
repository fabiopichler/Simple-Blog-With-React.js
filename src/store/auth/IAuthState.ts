import { IUser } from '../../interfaces/IUser';
import { AuthLoginStatus } from './AuthLoginStatus';

export interface IAuthState {
    loading: boolean;
    isLogged: boolean;
    user: IUser | null;
    loginStatus: AuthLoginStatus;
    logoutStatus: AuthLoginStatus;
}
