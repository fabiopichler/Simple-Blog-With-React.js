import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import userProfileImage from '../../../assets/img/user-profile.png';

import { ListPosts } from '../../../components/listPosts/ListPosts';
import { PageContent } from '../../../components/pageContent/PageContent';

import { IUserPostPaginated } from '../../../interfaces/IUserPostPaginated';
import { usePaginationAbstract } from '../../../services/api';

export const UserProfilePage: React.FC = () => {

    const { username } = useParams<{ username: string }>();

    const api = usePaginationAbstract<IUserPostPaginated | null>(`/users/${username}`, ['index'], null);

    return (
        <PageContent
            state={api.state}
            windowTitle={userPost => `Perfil de ${userPost.user.name}`}
        >
            {userPost => (
                <>
                    <Card className="user-profile mb-3">
                        <Card.Body className="text-center">
                            <img
                                src={userPost.user.avatar ?? userProfileImage}
                                className="user-avatar rounded-circle mb-3"
                            />

                            <h3 className="mb-0">{userPost.user.name}</h3>
                        </Card.Body>
                    </Card>

                    <h4 className="mb-3 mx-3">Publicações de {userPost.user.name}</h4>

                    {userPost.posts.content.length > 0 ? (
                        <ListPosts data={userPost.posts} />
                    ) : (
                        <Card className="mb-3">
                            <Card.Body className="p-5">
                                <div className="h4 m-0 text-center text-secondary">Ainda não há posts para exibir</div>
                            </Card.Body>
                        </Card>
                    )}
                </>
            )}
        </PageContent>
    );
}
