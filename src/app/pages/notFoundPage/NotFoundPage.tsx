import { PageContent } from '../../../components/pageContent/PageContent';
import { NotFound } from '../../../components/notFound/NotFound';

export const NotFoundPage: React.FC = () => (
    <PageContent windowTitle="Erro 404 - Not Found">
        <div className="mb-3">
            <NotFound />
        </div>
    </PageContent>
);
