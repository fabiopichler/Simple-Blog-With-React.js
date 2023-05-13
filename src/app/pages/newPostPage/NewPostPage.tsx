import { Navigate } from 'react-router-dom';
import { Alert, Button, Card, Container, FloatingLabel, Form } from 'react-bootstrap';
import { faExclamationTriangle, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { PageContent } from '../../../components/pageContent/PageContent';
import { IPost } from '../../../interfaces/IPost';
import { ApiStatus, useApi } from '../../../services/api';
import { Loading } from '../../../components/loading/Loading';
import { route } from '../../appRouter/AppRouter';

export const NewPostPage: React.FC = () => {

    const api = useApi<IPost | null>(null);

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        api.post('/posts', {
            postname: form.postname.value,
            title: (form.title as any).value,
            body: form.body.value,
        });
    }

    if (api.state.status === ApiStatus.Success)
        return <Navigate to={route('showPost', { postname: api.state.data?.postname })} />;

    return (
        <PageContent
            windowTitle="Novo Post"
        >
            <Container fluid="xxl">
                <Card
                    as="form"
                    onSubmit={onSubmitHandler}
                >
                    <Card.Header>
                        <h5 className="mb-0">
                            <FontAwesomeIcon icon={faNewspaper} className="text-secondary" /> Novo post
                        </h5>
                    </Card.Header>

                    <Card.Body>
                        {api.state.status === ApiStatus.Loading ? (
                            <Alert variant="primary">
                                <Loading />
                            </Alert>
                        ) : api.state.error ? (
                            <Alert variant="danger" dismissible>
                                <FontAwesomeIcon icon={faExclamationTriangle} /> Erro ao salvar os dados!
                                <br />
                                <span>{api.state.error.message}</span>
                            </Alert>
                        ) : null}

                        <FloatingLabel
                            controlId="title"
                            label="Título"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Título"
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="postname"
                            label="Post name"
                            className="mb-3"
                        >
                            <Form.Control
                                type="text"
                                name="postname"
                                placeholder="Post name"
                            />
                        </FloatingLabel>

                        <FloatingLabel
                            controlId="body"
                            label="Conteúdo da postagem"
                        >
                            <Form.Control
                                as="textarea"
                                name="body"
                                placeholder="Conteúdo da postagem"
                                style={{ height: '300px' }}
                            />
                        </FloatingLabel>
                    </Card.Body>

                    <Card.Footer>
                        <div className="d-flex flex-colunm">
                            <div className="ms-auto">
                                <Button
                                    type="submit"
                                    disabled={api.state.status === ApiStatus.Loading}
                                >
                                    Enviar
                                </Button>
                            </div>
                        </div>
                    </Card.Footer>
                </Card>
            </Container>
        </PageContent>
    );
};
