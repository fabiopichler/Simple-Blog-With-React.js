
import { Route, Routes } from 'react-router-dom';

import { NotFoundPage } from '../pages/notFoundPage/NotFoundPage';
import { HomePage } from '../pages/homePage/HomePage';
import { LoginPage } from '../pages/loginPage/LoginPage';
import { SearchPage } from '../pages/searchPage/SearchPage';
import { ShowPostPage } from '../pages/showPostPage/ShowPostPage';
import { NewPostPage } from '../pages/newPostPage/NewPostPage';
import { AppLayout } from '../layouts/appLayout/AppLayout';
import { AdminLayout } from '../layouts/adminLayout/AdminLayout';
import { UserProfilePage } from '../pages/userProfilePage/UserProfilePage';
import { RegisterPage } from '../pages/registerPage/RegisterPage';
import { RouteUrlGenerator } from '../../routing/routeUrlGenerator';
import { DashboardPage } from '../pages/dashboardPage/DashboardPage';

const routeUrlGenerator = RouteUrlGenerator.init({
    home: '/',
    search: '/search',
    showPost: '/post/:postname',
    userProfile: '/user/:username',
    login: '/login',
    register: '/register',
    dashboard: '/admin',
    newPost: '/admin/posts/new',
});

export const routes = routeUrlGenerator.gerRoutes();
export const route = routeUrlGenerator.route;

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route
                    path={routes.home}
                    element={<HomePage />}
                />

                <Route
                    path={routes.search}
                    element={<SearchPage />}
                />

                <Route
                    path={routes.showPost}
                    element={<ShowPostPage />}
                />

                <Route
                    path={routes.userProfile}
                    element={<UserProfilePage />}
                />
            </Route>

            <Route element={<AppLayout oneColumn />}>
                <Route
                    path={routes.login}
                    element={<LoginPage />}
                />
            </Route>

            <Route
                element={
                    <AppLayout unauthenticated oneColumn />
                }
            >
                <Route
                    path={routes.register}
                    element={<RegisterPage />}
                />
            </Route>

            <Route element={<AdminLayout />}>
                <Route
                    path={routes.dashboard}
                    element={<DashboardPage />}
                />

                <Route
                    path={routes.newPost}
                    element={<NewPostPage />}
                />
            </Route>

            <Route element={<AppLayout />}>
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Route>
        </Routes>
    );
}
