import styles from "../styles/emoji.component.module.scss"

export interface EmojiComponentProps {
    emoji: string
}

export default function EmojiComponent({ emoji }: EmojiComponentProps) {
    return (
        <img src={"emoji://" + emoji} className={styles.emoji} />
    )
}