import { faCalendarDays, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

import { Comments } from '../../../components/comments/Comments';
import { PageContent } from '../../../components/pageContent/PageContent';
import { IPost } from '../../../interfaces/IPost';
import { useApi } from '../../../services/api';
import { route } from '../../appRouter/AppRouter';

export const ShowPostPage: React.FC = () => {

    const { postname } = useParams<{ postname: string }>();

    const api = useApi<IPost | null>(null);

    useEffect(() => {
        api.get(`/posts/${postname}`);
    }, [postname]);

    return (
        <PageContent
            state={api.state}
            windowTitle={post => post.title}
        >
            {post => (
                <>
                    <Card className="mb-3">
                        <Card.Body className="pb-0">
                            <h3 className="mb-3 fw-light">
                                <Link
                                    to={route('showPost', { postname: post.postname })}
                                    className="link-primary"
                                >
                                    {post.title}
                                </Link>
                            </h3>

                            <small className="d-block text-secondary mb-3">
                                <span className="me-3">
                                    <FontAwesomeIcon icon={faCalendarDays} size="sm" />
                                    {' '}
                                    <time>{post.createdAtFormatted}</time>
                                </span>

                                <span className="me-3">
                                    <FontAwesomeIcon icon={faComments} size="sm" />
                                    {' '}
                                    <span>{post.commentsCount}</span>
                                </span>

                                <span>
                                    <FontAwesomeIcon icon={faUser} size="sm" />
                                    {' '}
                                    <Link
                                        to={route('userProfile', { username: post.user.username })}
                                        className="link-secondary"
                                    >
                                        {post.user.name}
                                    </Link>
                                </span>
                            </small>

                            <div className="content">
                                {post.body}

                                <div className="mt-3"></div>
                            </div>
                        </Card.Body>

                        <Card.Footer className="clearfix py-1">
                            <div className="small text-secondary float-start">
                                Atualizado em <time>{post.updatedAtFormatted}</time>
                            </div>
                        </Card.Footer >
                    </Card>

                    <Comments post={post} />
                </>
            )}
        </PageContent>
    );
};
