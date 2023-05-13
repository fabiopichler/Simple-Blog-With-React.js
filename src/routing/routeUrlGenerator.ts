import { createSearchParams, URLSearchParamsInit } from 'react-router-dom';

export interface IRoutes {
    [key: string]: string;
}

export interface IRouteParams {
    [key: string]: string | string[] | number | number[] | undefined;
}

export class RouteUrlGenerator<T extends IRoutes> {

    private routes: T;

    public static readonly init = <T extends IRoutes>(routes: T): RouteUrlGenerator<T> => (
        new RouteUrlGenerator<T>(routes)
    );

    private constructor(routes: T) {
        this.routes = routes;
    }

    public readonly gerRoutes = (): T => this.routes;

    public readonly getRouteByName = (name: keyof T): T[keyof T] | null => {
        return Object.hasOwn(this.routes, name) ? this.routes[name] : null;
    }

    public readonly routePath = (route: string, params?: IRouteParams | null, searchParams?: IRouteParams): string => {
        let pathName = route;

        if (params) {
            for (const param of Object.entries(params)) {
                if (Array.isArray(param[1])) {
                    for (const value of param[1])
                        pathName = pathName.replace(`:${param[0]}`, String(value));
                } else if (param[1]) {
                    pathName = pathName.replace(`:${param[0]}`, String(param[1]));
                }
            }
        }

        if (searchParams)
            return `${pathName}?${createSearchParams(searchParams as URLSearchParamsInit)}`;

        return pathName;
    }

    public readonly route = (name: keyof T, params?: IRouteParams | null, searchParams?: IRouteParams): string => {
        const route = this.getRouteByName(name);

        if (route)
            return this.routePath(route, params, searchParams);

        console.error(`Route [${String(name)}] not defined`);

        return '';
    }
}
