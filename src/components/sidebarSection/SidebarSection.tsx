import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISidebarSectionProps } from './ISidebarSectionProps';

export const SidebarSection: React.FC<ISidebarSectionProps> = ({
    title,
    titleClass,
    icon,
    iconClass,
    children,
    className,
    headerClass,
    bodyClass,
}) => (
    <section className={clsx("card mb-3", className)}>
        {title ? (
            <div className={clsx("card-header", headerClass)}>
                <h6 className={clsx("card-title mb-0", titleClass)}>
                    {icon ? (
                        <FontAwesomeIcon icon={icon} className={clsx("me-2 text-secondary", iconClass)} />
                    ) : null}

                    {title}
                </h6>
            </div>
        ) : null}

        {children ? (
            <div className={clsx("card-body", bodyClass)}>
                {children}
            </div>
        ) : null}
    </section>
);
