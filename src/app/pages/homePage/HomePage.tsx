import { Card } from 'react-bootstrap';

import { ListPosts } from '../../../components/listPosts/ListPosts';
import { PageContent } from '../../../components/pageContent/PageContent';

import { IPost } from '../../../interfaces/IPost';
import { usePagination } from '../../../services/api';

export const HomePage: React.FC = () => {

    const api = usePagination<IPost>('/posts', ['index']);

    return (
        <PageContent
            state={api.state}
            windowTitle="Home - My Site"
        >
            {page => (
                page.content.length > 0 ? (
                    <ListPosts data={page} />
                ) : (
                    <Card className="mb-3">
                        <Card.Body className="p-5">
                            <div className="h4 m-0 text-center text-secondary">Ainda não há posts para exibir</div>
                        </Card.Body>
                    </Card>
                )
            )}
        </PageContent>
    );
}
