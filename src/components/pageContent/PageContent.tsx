import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

import { ApiStatus } from '../../services/api';
import { Loading } from '../loading/Loading';
import { NotFound } from '../notFound/NotFound';

import { IPageContentProps } from './IPageContentProps';

export const PageContent = <T,>({
    children,
    state,
    windowTitle,
}: IPageContentProps<T>): React.ReactElement<IPageContentProps<T>, any> | null => {

    useEffect(() => {
        if (state?.status === ApiStatus.Loading) {
            document.title = 'Carregando...';

        } else if (state?.error?.response?.status === 404) {
            document.title = 'Erro 404 - Not Found';

        } else if (state?.error) {
            document.title = `Erro ${state.error.response?.status}`;

        } else if (typeof windowTitle === 'function' && state?.data) {
            const title = windowTitle(state.data);

            if (typeof title === 'string')
                document.title = title;

        } else if (typeof windowTitle === 'string') {
            document.title = windowTitle;
        } else {
            document.title = 'My Site';
        }
    }, [windowTitle, state?.status]);

    return (
        <>
            {typeof children === 'function' ? (
                state?.status === ApiStatus.Loading ? (
                    <Loading withCard className="mb-3" />
                ) : state?.data ? (
                    children(state.data)
                ) : state?.error?.response?.status === 404 ? (
                    <div className="mb-3">
                        <NotFound />
                    </div>
                ) : state?.error ? (
                    <Alert variant="danger" className="mb-3">
                        <Alert.Heading>
                            <FontAwesomeIcon icon={faExclamationTriangle} /> Erro ao carregar os dados
                        </Alert.Heading>

                        <span>{state.error.message}</span>
                    </Alert>
                ) : (
                    null
                )
            ) : (
                children
            )}
        </>
    );
};
