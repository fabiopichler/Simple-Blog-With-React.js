import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ISocialLinksChildren {
    className?: string;
    title: string;
    link: string;
    linkClass?: string;
    description: string;
    icon: IconProp;
    iconClass: string;
}

export interface ISocialLinksProps {
    className?: string;
    children: ISocialLinksChildren[];
}
