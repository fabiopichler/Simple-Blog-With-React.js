import { Button, Card, FloatingLabel, Form } from 'react-bootstrap';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import userProfileImage from '../../assets/img/user-profile.png';

import { IComment } from '../../interfaces/IComment';
import { ICommentsProps } from './ICommentsProps';
import { ApiStatus, useApi } from '../../services/api';
import { useAuth } from '../../store/auth/authSlice';
import { useEffect, useState } from 'react';

export const Comments: React.FC<ICommentsProps> = ({ post }) => {

    const auth = useAuth();
    const api = useApi<IComment | null>(null);

    const [comments, setComments] = useState<IComment[]>([]);
    const [authorName, setAuthorName] = useState<string>('');
    const [authorEmail, setAuthorEmail] = useState<string>('');
    const [body, setBody] = useState<string>('');

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data: any = {
            postId: post.id,
            body,
        };

        if (auth.isLogged) {
            data.authorName = 'ignored';
            data.authorEmail = 'ignored@ignored';
        } else {
            data.authorName = authorName;
            data.authorEmail = authorEmail;
        }

        api.post('/comments', data);
    }

    useEffect(() => {
        setComments(post.comments);
    }, []);

    useEffect(() => {
        if (api.state.status === ApiStatus.Success && api.state.data) {
            setComments(comments => [api.state.data!, ...comments]);
            setAuthorName('');
            setAuthorEmail('');
            setBody('');
        }
    }, [api.state.status]);

    return (
        <Card className="comments mb-3">
            <Card.Header className="border-bottom">
                <h5 className="card-title mb-2">
                    <FontAwesomeIcon icon={faComments} className="text-secondary" />
                    {' '}
                    Comentários ({comments.length})
                </h5>

                <Form onSubmit={onSubmitHandler}>
                    <div className="mb-2">Escreva um comentário:</div>

                    {!auth.isLogged ? (
                        <>
                            <FloatingLabel
                                controlId="authorName"
                                label="Nome"
                                className="mb-2"
                            >
                                <Form.Control
                                    type="text"
                                    name="authorName"
                                    placeholder="nome"
                                    required
                                    value={authorName}
                                    onChange={e => setAuthorName(e.target.value)}
                                />
                            </FloatingLabel>

                            <FloatingLabel
                                controlId="authorEmail"
                                label="Endereço de Email"
                                className="mb-2"
                            >
                                <Form.Control
                                    type="email"
                                    name="authorEmail"
                                    placeholder="name@example.com"
                                    required
                                    value={authorEmail}
                                    onChange={e => setAuthorEmail(e.target.value)}
                                />
                            </FloatingLabel>
                        </>
                    ) : null}

                    <FloatingLabel
                        controlId="comment-body"
                        label="Comentário"
                        className="mb-2"
                    >
                        <Form.Control
                            as="textarea"
                            name="body"
                            placeholder="Leave a comment here"
                            style={{ height: 100 }}
                            value={body}
                            onChange={e => setBody(e.target.value)}
                        />
                    </FloatingLabel>

                    <div className="d-flex">
                        <Button
                            type="submit"
                            className="btn btn-primary ms-auto"
                            disabled={api.state.status === ApiStatus.Loading}
                        >
                            Enviar comentário
                        </Button>
                    </div>
                </Form>
            </Card.Header>

            {comments.length > 0 ? (
                <Card.Body className="pb-0">
                    {comments.map((comment, index) => (
                        <div
                            key={index}
                            id={`comment_${comment.id}`}
                            className="bg-light mb-2 p-2"
                        >
                            <div className="d-flex">
                                <img
                                    src={comment.user?.avatar ?? userProfileImage}
                                    className="user-avatar rounded-circle me-2"
                                />

                                <div>
                                    <h6 className="mb-0">{comment.authorName}</h6>

                                    <small className="text-secondary">{comment.createdAtFormatted}</small>
                                </div>
                            </div>

                            <div>{comment.body}</div>
                        </div>
                    ))}

                    <div className="mt-3"></div>
                </Card.Body>
            ) : (
                <Card.Body className="py-5">
                    <div className="h5 m-0 text-center text-secondary">Ainda não há comentários</div>
                </Card.Body>
            )}
        </Card>
    );
};
