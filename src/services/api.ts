import React from 'react';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { useSearchParams } from 'react-router-dom';

import { IPaginatorPage } from '../interfaces/IPaginatorPage';
import { getJwtToken, removeJwtToken, setJwtToken } from './authStorageApi';

const baseURL = process.env.REACT_APP_API_URL;

export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(config => {
    const token = getJwtToken();

    if (token)
        config.headers.Authorization = `Bearer ${token.accessToken}`;

    return config;
});

const refreshAuth = async (failedRequest: any) => {
    const token = getJwtToken();

    try {
        const { data } = await api.post('/auth/refresh', { refreshToken: token?.refreshToken });

        setJwtToken({ accessToken: data.accessToken, refreshToken: data.refreshToken });
        failedRequest.response.config.headers.Authorization = `Bearer ${data.accessToken}`;

        return await Promise.resolve();

    } catch (reason: any) {
        if (reason.response.status == 401 || reason.response.status == 403)
            removeJwtToken();

        return await Promise.reject();
    }
}

createAuthRefreshInterceptor(api, refreshAuth);

export enum ApiStatus {
    Nothing,
    Loading,
    Success,
    Error,
    Canceled,
}

export interface IApiState<T, D = any> {
    status: ApiStatus;
    data: T;
    response?: AxiosResponse<T, D>;
    error?: AxiosError<T, D>;
}

export const useApi = <T, D = any>(defaultData: T, throwError: boolean = false) => {
    const [state, setState] = React.useState<IApiState<T, D>>({ status: ApiStatus.Nothing, data: defaultData });

    const setLoadingState = () => setState({ status: ApiStatus.Loading, data: defaultData });
    const setResponseState = (data: T, response: AxiosResponse<T, D>) => setState({ status: ApiStatus.Success, data, response });
    const setErrorState = (error: AxiosError<T, D>) => setState({ status: ApiStatus.Error, error, data: defaultData });
    const setCanceledState = () => setState({ status: ApiStatus.Canceled, data: defaultData });

    const request = React.useCallback(
        async (_request: Promise<AxiosResponse<T, D>>) => {
            setLoadingState();

            try {
                const response = await _request;

                setResponseState(response.data, response);

                return response;

            } catch (error) {
                if (axios.isCancel(error)) {
                    setCanceledState();
                    return null;
                }

                setErrorState(error as AxiosError<T, D>);

                if (throwError)
                    throw error;
            }

            return null;
        },
        []
    );

    const controller = new AbortController();
    const _config = { signal: controller.signal };

    const get = React.useCallback(
        async (url: string, config?: AxiosRequestConfig<D>) => (
            request(api.get<T>(url, { ...config, ..._config }))
        ),
        []
    );

    const post = React.useCallback(
        async (url: string, data?: D, config?: AxiosRequestConfig<D>) => (
            request(api.post<T>(url, data, { ...config, ..._config }))
        ),
        []
    );

    const cancel = React.useCallback(
        () => controller.abort(),
        []
    );

    return {
        state,
        get,
        post,
        cancel,
    };
};

export const useGet = <T, D = any>(url: string, defaultData: T, config?: AxiosRequestConfig<D>) => {
    const api = useApi<T, D>(defaultData);

    const get = React.useCallback(() => { api.get(url, config); }, []);

    React.useEffect(get, []);

    return { state: api.state, get, cancel: api.cancel };
};

export const usePaginationAbstract = <T, D = any>(
    url: string,
    params: string[],
    defaultData: T,
    config?: AxiosRequestConfig<D>
) => {
    const [searchParams] = useSearchParams();

    const api = useApi<T>(defaultData);

    const get = React.useCallback(
        () => {
            const _config = config ? { ...config } : {};
            _config.params = _config.params ? { ..._config.params } : {};

            for (const param of params) {
                if (searchParams.has(param))
                    _config.params[param] = searchParams.get(param);
            }

            api.get(url, _config);
        },
        [searchParams]
    );

    React.useEffect(get, [searchParams]);

    return { state: api.state, get, cancel: api.cancel };
};

export const setDefaultPaginationData = <T>(): IPaginatorPage<T> => ({
    currentPage: 0,
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 0,
    contentSize: 0,
    content: [],
});

export const usePagination = <T, D = any>(url: string, params: string[], config?: AxiosRequestConfig<D>) => {
    return usePaginationAbstract<IPaginatorPage<T>, D>(
        url,
        params,
        setDefaultPaginationData(),
        config
    );
};
