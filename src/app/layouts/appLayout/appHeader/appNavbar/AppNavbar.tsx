import { useEffect, useState } from 'react';
import { createSearchParams, Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Container, Form, InputGroup, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDashboard,
    faMagnifyingGlass,
    faRightFromBracket,
    faRightToBracket,
    faUser,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';

import { route } from '../../../../appRouter/AppRouter';
import { logoutAuth, useAuth } from '../../../../../store/auth/authSlice';
import { useAppDispatch } from '../../../../../store/hooks';

export const AppNavbar: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const auth = useAuth();
    const dispatch = useAppDispatch();

    const [searchQ, setSearchQ] = useState('');

    useEffect(() => {
        const q = searchParams.get('q');

        if (q)
            setSearchQ(q);
    }, []);

    const onLogoutHandler = () => dispatch(logoutAuth());

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!searchQ)
            return;

        navigate({
            pathname: route('search'),
            search: `?${createSearchParams({ q: searchQ })}`,
        });
    }

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container fluid="lg">
                <Navbar.Brand as={Link} to={route('home')}>My Site</Navbar.Brand>

                <Navbar.Toggle aria-controls="offcanvasNavbar" />

                <Navbar.Offcanvas
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel"
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">
                            My Site
                        </Offcanvas.Title>
                    </Offcanvas.Header>

                    <Offcanvas.Body className="align-items-center">
                        <Nav className="me-auto mb-2 mb-md-0">
                            <Nav.Link as={Link} to={route('home')}>Home</Nav.Link>
                        </Nav>

                        <Form
                            onSubmit={onSubmitHandler}
                            className="d-flex align-items-center me-3 mb-3 mb-md-0"
                            role="search"
                        >
                            <InputGroup size="sm">
                                <Form.Control
                                    name="q"
                                    type="search"
                                    placeholder="Pesquisar"
                                    aria-label="Pesquisar"
                                    onChange={e => setSearchQ(e.target.value)}
                                    value={searchQ}
                                />

                                <Button variant="outline-success" type="submit">
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </Button>
                            </InputGroup>
                        </Form>

                        {auth.isLogged ? (
                            <Button
                                as={Link as any}
                                to={route('newPost')}
                                variant="success"
                                size="sm"
                                className="me-3 mb-2 mb-md-0"
                            >
                                Novo Post
                            </Button>
                        ) : null}

                        <Nav className="mb-2 mb-md-0">
                            {auth.isLogged ? (
                                <>
                                    <Nav.Link as={Link} to={route('dashboard')}>
                                        <FontAwesomeIcon icon={faDashboard} size="sm" /> Administração
                                    </Nav.Link>

                                    <NavDropdown
                                        title={
                                            <FontAwesomeIcon icon={faUser} size="sm" />
                                        }
                                        id="basic-nav-dropdown"
                                    >
                                        <NavDropdown.Item
                                            as={Link}
                                            to={route('userProfile', { username: auth.user?.username })}
                                        >
                                            <FontAwesomeIcon icon={faUser} size="sm" /> Meu perfil
                                        </NavDropdown.Item>

                                        <NavDropdown.Divider />

                                        <NavDropdown.Item
                                            as="button"
                                            onClick={onLogoutHandler}
                                        >
                                            <FontAwesomeIcon icon={faRightFromBracket} size="sm" /> Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to={route('login')}>
                                        <FontAwesomeIcon icon={faRightToBracket} size="sm" /> Login
                                    </Nav.Link>

                                    <Nav.Link as={Link} to={route('register')}>
                                        <FontAwesomeIcon icon={faUserPlus} size="sm" /> Registrar
                                    </Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};
