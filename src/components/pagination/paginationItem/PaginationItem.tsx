import clsx from "clsx";
import { Link } from "react-router-dom";

import { IPaginationItemProps } from "./IPaginationItemProps";

export const PaginationItem: React.FC<IPaginationItemProps> = ({
    children,
    to,
    active = false,
}) => (
    <li className={clsx('page-item', { active })}>
        {to ? (
            <Link
                to={to}
                className="page-link"
            >
                {children}
            </Link>
        ) : (
            <span
                className={clsx("page-link", { "link-secondary": !active })}
            >
                {children}
            </span>
        )}
    </li>
);
