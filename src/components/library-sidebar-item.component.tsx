import styles from '../styles/library-sidebar-item.component.module.scss';

export interface LibrarySidebarItemProps {
    selected: boolean;
    title: string;
    icon: any;
}

export default function LibrarySidebarItemComponent(props: LibrarySidebarItemProps) {

    const Icon = props.icon;
    const containerClassName = `${styles.librarySidebarItemContainer} ${props.selected ? styles.selected : ''}`;

    return (
        <div className={containerClassName}>
            <div className={styles.librarySidebarItemIcon}>
                <Icon />
            </div>
            <div className={styles.librarySidebarItemTitle}>{props.title}</div>
        </div>
    )
}