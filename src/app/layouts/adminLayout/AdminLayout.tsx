import styled from 'styled-components';
import { useEffect } from 'react';
import { Container, Nav } from 'react-bootstrap';
import { createSearchParams, Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { resetAuthLoginStatus, useAuth } from '../../../store/auth/authSlice';
import { route } from '../../appRouter/AppRouter';
import { AdminNavbar } from './adminNavbar/AdminNavbar';
import { AuthLoginStatus } from '../../../store/auth/AuthLoginStatus';
import { useAppDispatch } from '../../../store/hooks';

const SideBar = styled.div`
    position: relative;
    z-index: 1;
    width: 70px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    transition: width 150ms;

    .nav-link-value {
        position: absolute;
        visibility: hidden;
        opacity: 0;
        transition: opacity 500ms linear;
    }

    @media (min-width: 576px) {
        width: 280px;

        .nav-link-value {
            position: static;
            visibility: visible;
            opacity: 1;
        }
    }
`;

export const AdminLayout: React.FC = () => {

    const location = useLocation();

    const auth = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (auth.loginStatus === AuthLoginStatus.Success)
            dispatch(resetAuthLoginStatus());
    }, [auth.loginStatus]);

    if (!auth.isLogged) {
        let params: { [key: string]: string };

        if (auth.logoutStatus === AuthLoginStatus.Success)
            params = { logout: 'true' };
        else
            params = { redirect: location.pathname };

        return <Navigate
            to={{
                pathname: route('login'),
                search: `?${createSearchParams(params)}`
            }}
        />;
    }

    return (
        <div className="w-100 h-100 d-flex">
            <SideBar className="bg-dark text-white">
                <h5 className="text-center fw-light mb-0 py-4">My Site</h5>

                <hr className="mt-0" />

                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link
                        as={Link}
                        to={route('dashboard')}
                        className="link-light text-center text-sm-start"
                    >
                        <FontAwesomeIcon icon={faDashboard} size="lg" />

                        <span className="nav-link-value ms-3">Home</span>
                    </Nav.Link>

                    <Nav.Link
                        as={Link}
                        to={route('newPost')}
                        className="link-light text-center text-sm-start"
                    >
                        <FontAwesomeIcon icon={faNewspaper} size="lg" />

                        <span className="nav-link-value ms-3">Novo Post</span>
                    </Nav.Link>
                </Nav>
            </SideBar>

            <div className="w-100 h-100 d-flex flex-column">
                <header className="mb-3">
                    <AdminNavbar />
                </header>

                <Container as="main" fluid>
                    <Outlet />
                </Container>

                <footer className="mt-auto p-3 text-secondary bg-white border-top small fw-bold">
                    Copyright &copy; 2023,
                    {' '}
                    <a
                        href="https://fabiopichler.net"
                        target="_blank"
                        className="link-secondary"
                    >
                        Fábio Pichler
                    </a>
                </footer>
            </div>
        </div>
    );
};
