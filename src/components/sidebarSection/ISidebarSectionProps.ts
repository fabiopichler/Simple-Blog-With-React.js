import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ISidebarSectionProps {
    title?: string;
    titleClass?: string;
    icon?: IconProp;
    iconClass?: string;
    children?: React.ReactNode;
    className?: string;
    headerClass?: string;
    bodyClass?: string;
}
