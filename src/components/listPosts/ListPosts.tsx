import { faCalendarDays, faComments, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { route } from '../../app/appRouter/AppRouter';
import { IPost } from '../../interfaces/IPost';
import { Pagination } from '../pagination/Pagination';
import { IListPostsProps } from './IListPostsProps';

export const ListPosts: React.FC<IListPostsProps<IPost>> = ({ data }) => (
    <>
        {data.content.map((post, index) => (
            <Card
                key={index}
                className="mb-3"
            >
                <Card.Body className="pb-0">
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

                    <h4 className="mb-3 fw-light">
                        <Link
                            to={route('showPost', { postname: post.postname })}
                            className="link-primary"
                        >
                            {post.title}
                        </Link>
                    </h4>

                    <div className="content">
                        {post.body}

                        <div className="mt-3"></div>
                    </div>
                </Card.Body>

                <Card.Footer className="clearfix py-1">
                    <div className="small text-secondary float-start">
                        Atualizado em <time>{post.updatedAtFormatted}</time>
                    </div>

                    <div className="float-end">
                        <Link to={route('showPost', { postname: post.postname })}>Continue lendo...</Link>
                    </div>
                </Card.Footer >
            </Card>
        ))}

        <Pagination
            totalPages={data.totalPages}
            currentPage={data.currentPage}
            size="sm"
            align="center"
        />
    </>
);
