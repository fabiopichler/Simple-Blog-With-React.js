import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { route } from '../../app/appRouter/AppRouter';

export const NotFound: React.FC = () => (
    <Card>
        <Card.Body>
            <h2>Erro 404</h2>

            <div className="mb-2">O conteúdo não foi encontrado</div>

            <div>
                <Link to={route('home')}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    {' '}
                    Voltar para o início
                </Link>
            </div>
        </Card.Body>
    </Card>
);
