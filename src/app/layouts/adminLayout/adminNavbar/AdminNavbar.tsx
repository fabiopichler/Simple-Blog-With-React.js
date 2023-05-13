import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';

import { logoutAuth, useAuth } from '../../../../store/auth/authSlice';
import { useAppDispatch } from '../../../../store/hooks';
import { route } from '../../../appRouter/AppRouter';

export const AdminNavbar: React.FC = () => {

    const auth = useAuth();
    const dispatch = useAppDispatch();

    const onLogoutHandler = () => dispatch(logoutAuth());

    return (
        <Navbar bg="white" variant="light" expand="md" className="border-bottom">
            <Container fluid>
                <Navbar.Toggle aria-controls="offcanvasNavbar" className="ms-auto" />

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
                        <Nav className="me-3 mb-2 mb-md-0">
                            <Nav.Link as={Link} to={route('home')}>
                                <FontAwesomeIcon icon={faHome} size="sm" /> Ver site
                            </Nav.Link>
                        </Nav>

                        <Button
                            as={Link as any}
                            to={route('newPost')}
                            variant="success"
                            size="sm"
                            className="me-auto mb-2 mb-md-0"
                        >
                            Novo Post
                        </Button>

                        <Nav className="mb-2 mb-md-0">
                            <NavDropdown
                                title={
                                    <>
                                        <FontAwesomeIcon icon={faUser} size="sm" />
                                        {' '}
                                        <span>{auth.user?.name}</span>
                                    </>
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
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};
