import { Col, Container, Row } from 'react-bootstrap';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../../store/auth/authSlice';
import { AppFooter } from './appFooter/AppFooter';
import { AppHeader } from './appHeader/AppHeader';
import { route } from '../../appRouter/AppRouter';
import { AppSidebar } from './appSidebar/AppSidebar';
import { IAppLayoutProps } from './IAppLayoutProps';

export const AppLayout: React.FC<IAppLayoutProps> = ({
    unauthenticated,
    sidebar,
    oneColumn,
}) => {

    const auth = useAuth();

    if (unauthenticated && auth.isLogged)
        return <Navigate to={route('dashboard')} />;

    return (
        <div className="h-100 d-flex flex-column">
            <AppHeader />

            {oneColumn ? (
                <main className="h-100">
                    <Outlet />
                </main>
            ) : (
                <Container fluid="lg">
                    <Row>
                        <Col as="main" md={8}>
                            <Outlet />
                        </Col>

                        <Col as="aside" md={4}>
                            {sidebar ? (
                                sidebar
                            ) : (
                                <AppSidebar />
                            )}
                        </Col>
                    </Row>
                </Container>
            )}

            <AppFooter />
        </div>
    );
}
