import { useCallback } from 'react';
import {
    createSearchParams,
    URLSearchParamsInit,
    useLocation,
    useSearchParams
} from 'react-router-dom';

type UrlParams = {
    [key: string]: string | number
}

export const useRequestUrl = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const requestUrl = useCallback(
        (params: UrlParams) => {
            const _params: URLSearchParamsInit = {};

            for (const param of searchParams)
                _params[param[0]] = param[1];

            for (const param of Object.entries(params))
                _params[param[0]] = String(param[1]);

            return `${location.pathname}?${createSearchParams(_params)}`;
        },
        [location.pathname, searchParams]
    );

    return { requestUrl };
};
