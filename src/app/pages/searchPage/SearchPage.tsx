import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

import { ListPosts } from '../../../components/listPosts/ListPosts';
import { PageContent } from '../../../components/pageContent/PageContent';
import { IPost } from '../../../interfaces/IPost';
import { usePagination } from '../../../services/api';

export const SearchPage: React.FC = () => {
    const [searchParams] = useSearchParams();

    const api = usePagination<IPost>('/posts/search', ['q', 'index']);

    return (
        <PageContent
            state={api.state}
            windowTitle="Resultado da pesquisa - My Site"
        >
            {page => (
                <>
                    <Card className="mb-3">
                        <Card.Header>
                            <h4 className="mb-0">
                                <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" className="text-secondary" />
                                {' '}
                                Resultado da pesquisa
                            </h4>
                        </Card.Header>

                        <Card.Body>
                            <div>
                                Termo da pesquisa: <span className="fw-bold">{searchParams.get('q')}</span>
                            </div>

                            <div>
                                Resultados encontrados: <span className="fw-bold">{page.totalItems}</span>
                            </div>
                        </Card.Body>
                    </Card>

                    {page.content.length > 0 ? (
                        <ListPosts data={page} />
                    ) : (
                        <Card className="mb-3">
                            <Card.Body className="p-5">
                                <div className="h4 m-0 text-center text-secondary">Nenhum resultado para exibir</div>
                            </Card.Body>
                        </Card>
                    )}
                </>
            )}
        </PageContent>
    );
};
