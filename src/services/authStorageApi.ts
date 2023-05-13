import { IJwtToken } from '../interfaces/IJwtToken';

const TOKEN_KEY = "jwt-token";

export const setJwtToken = (token: IJwtToken) => localStorage.setItem(TOKEN_KEY, JSON.stringify(token));

export function getJwtToken(): IJwtToken | null {
    const item = localStorage.getItem(TOKEN_KEY);

    if (item)
        return JSON.parse(item);

    return null;
}

export const removeJwtToken = () => localStorage.removeItem(TOKEN_KEY);
