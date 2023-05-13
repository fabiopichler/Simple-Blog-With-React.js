import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISocialLinksProps } from './ISocialLinksProps';

export const SocialLinks: React.FC<ISocialLinksProps> = ({
    className,
    children,
}) => (
    <div className={className}>
        {children.map((value, index) => (
            <span
                key={index}
                className={clsx({"mt-2": index !== 0}, value.className)}
            >
                <a
                    href={value.link}
                    title={value.description}
                    className={value.linkClass}
                    rel="nofollow me"
                    target="_blank"
                >
                    <FontAwesomeIcon
                        icon={value.icon}
                        className={clsx("me-2", value.iconClass)}
                    />

                    {value.title}
                </a>
            </span>
        ))}
    </div>
);
