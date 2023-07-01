import styles from "../styles/emoji.component.module.scss"

export interface EmojiComponentProps {
    emoji: string
}

export default function EmojiComponent({ emoji }: EmojiComponentProps) { // shorthand component for creating an emoji image
    return (
        <img src={"emoji://" + emoji} className={styles.emoji} />
    )
}