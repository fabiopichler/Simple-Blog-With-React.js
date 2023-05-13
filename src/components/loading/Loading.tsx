import clsx from 'clsx';
import { Spinner } from 'react-bootstrap';

import { ILoadingProps } from './ILoadingProps';

export const Loading: React.FC<ILoadingProps> = ({
    withCard = false,
    className,
}) => (
    <div
        className={clsx(
            "d-flex justify-content-center align-items-center",
            {
                "card p-5": withCard,
                "h-100": !withCard,
            },
            className,
        )}
    >
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>
);
