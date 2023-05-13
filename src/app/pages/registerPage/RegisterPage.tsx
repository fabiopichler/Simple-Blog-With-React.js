import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import { faTriangleExclamation, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageContent } from '../../../components/pageContent/PageContent';
import { ApiStatus, useApi } from '../../../services/api';
import { Loading } from '../../../components/loading/Loading';
import { IUser } from '../../../interfaces/IUser';
import { route } from '../../appRouter/AppRouter';

export const RegisterPage: React.FC = () => {

    const api = useApi<IUser | null>(null);

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        api.post('/auth/signup', {
            name,
            username,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });
    }

    if (api.state.status === ApiStatus.Success) {
        return (
            <PageContent
                windowTitle="Registro concluído"
            >
                <div className="h-100 d-flex justify-content-center align-items-center">
                    <Card>
                        <Card.Header>
                            <h4 className="mb-0">Registro concluído</h4>
                        </Card.Header>

                        <Card.Body>
                            O registro foi concluído, agora você pode <Link to={route('login')}>fazer o login</Link> usando seu nome de usuário e senha.
                        </Card.Body>
                    </Card>
                </div>
            </PageContent>
        );
    }

    return (
        <PageContent
            windowTitle="Registrar-se"
        >
            <div className="h-100 d-flex justify-content-center align-items-center">
                <Card
                    as="form"
                    onSubmit={onSubmitHandler}
                    className="register-form mb-3 w-100"
                >
                    <Card.Header>
                        <h5 className="mb-0">
                            <FontAwesomeIcon icon={faUserPlus} className="text-secondary" /> Registrar-se
                        </h5>
                    </Card.Header>

                    <Card.Body>
                        {api.state.status === ApiStatus.Loading ? (
                            <Alert variant="primary">
                                <Loading />
                            </Alert>
                        ) : api.state.status === ApiStatus.Error ? (
                            <Alert variant="danger">
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                {' '}
                                <span>Erro: {api.state.error?.response?.statusText}</span>
                            </Alert>
                        ) : null}

                        <FloatingLabel
                            controlId="name"
                            label="Nome"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="name"
                                placeholder="Name"
                                required
                                onChange={e => setName(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="username"
                            label="Nome de usuário"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                onChange={e => setUsername(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="email"
                            label="Endereço de E-mail"
                            className="mb-3"
                        >
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="password"
                            label="Senha de usuário"
                            className="mb-3"
                        >
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="password-repeat"
                            label="Repetir a senha"
                        >
                            <Form.Control
                                type="password"
                                name="passwordRepeat"
                                placeholder="Password repeat"
                                required
                                onChange={e => setPasswordConfirmation(e.target.value)}
                            />
                        </FloatingLabel>
                    </Card.Body>

                    <Card.Footer className="d-flex flex-colunm align-items-center justify-content-between">
                        <Form.Check
                            type="checkbox"
                            name="remember-me"
                            id="remember-me"
                            label="Concordo com os termos"
                        />

                        <div>
                            <Button
                                type="submit"
                                disabled={api.state.status === ApiStatus.Loading}
                            >
                                Registrar-se
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        </PageContent>
    );
};
