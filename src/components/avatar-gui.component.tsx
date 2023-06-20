import styles from "../styles/avatar-gui.component.module.scss";

export interface AvatarGuiComponentProps {
    avatar: string
}

export default function AvatarGuiComponent({ avatar }: AvatarGuiComponentProps) {
    return (

        <img className={styles.avatar} src={`avatar://${avatar}`} />
    )
}