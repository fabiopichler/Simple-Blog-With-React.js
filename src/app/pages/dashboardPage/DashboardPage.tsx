import { Container } from 'react-bootstrap';

import { LastPosts } from './lastPosts/LastPosts';

export const DashboardPage: React.FC = () => (
    <Container fluid>
        <h3 className="mb-3 fw-normal">Painel de Controle</h3>

        <LastPosts />
    </Container>
);
