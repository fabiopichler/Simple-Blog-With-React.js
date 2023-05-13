import { faCircleInfo, faRightToBracket, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Alert, Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import { Navigate, useSearchParams } from 'react-router-dom';

import { Loading } from '../../../components/loading/Loading';
import { PageContent } from '../../../components/pageContent/PageContent';
import { AuthLoginStatus } from '../../../store/auth/AuthLoginStatus';
import { loginAuth, resetAuthLogoutStatus, useAuth } from '../../../store/auth/authSlice';
import { useAppDispatch } from '../../../store/hooks';
import { route } from '../../appRouter/AppRouter';

export const LoginPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    const auth = useAuth();
    const dispatch = useAppDispatch();

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        dispatch(loginAuth({
            username: form.username.value,
            password: form.password.value,
        }));
    }

    useEffect(() => {
        if (auth.logoutStatus === AuthLoginStatus.Success)
            dispatch(resetAuthLogoutStatus());
    }, [auth.loginStatus]);

    if (auth.loginStatus === AuthLoginStatus.Success) {
        const pathname = searchParams.has('redirect') ? searchParams.get('redirect')! : route('dashboard');

        return <Navigate to={pathname} />;
    }

    if (auth.isLogged)
        return <Navigate to={route('dashboard')} />;

    return (
        <PageContent
            windowTitle="Login"
        >
            <div className="h-100 d-flex justify-content-center align-items-center">
                <Card
                    as="form"
                    onSubmit={onSubmitHandler}
                    className="login-form mb-3 w-100"
                >
                    <Card.Header>
                        <h5 className="mb-0">
                            <FontAwesomeIcon icon={faRightToBracket} className="text-secondary" /> Login
                        </h5>
                    </Card.Header>

                    <Card.Body>
                        {searchParams.has('logout') ? (
                            <Alert variant="success">
                                <FontAwesomeIcon icon={faCircleInfo} />
                                {' '}
                                <span>Você desconectou com sucesso</span>
                            </Alert>
                        ) : null}

                        {auth.loginStatus === AuthLoginStatus.Loading ? (
                            <Alert variant="primary">
                                <Loading />
                            </Alert>
                        ) : auth.loginStatus === AuthLoginStatus.Error ? (
                            <Alert variant="danger">
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                {' '}
                                <span>Usuário ou senha incorretos</span>
                            </Alert>
                        ) : null}

                        <FloatingLabel
                            controlId="username"
                            label="Nome de usuário ou E-mail"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="password"
                            label="Senha do seu usuário"
                        >
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </FloatingLabel>
                    </Card.Body>

                    <Card.Footer className="d-flex flex-colunm align-items-center justify-content-between">
                        <Form.Check
                            type="checkbox"
                            name="remember-me"
                            id="remember-me"
                            label="Lembrar-me"
                        />

                        <div>
                            <Button
                                type="submit"
                                disabled={auth.loginStatus === AuthLoginStatus.Loading}
                            >
                                Entrar
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </PageContent>
    );
}
