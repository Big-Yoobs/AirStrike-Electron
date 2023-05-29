import { useMemo } from "react"
import styles from "../styles/chat-message.component.module.scss"

export interface ChatMessageProps {
    text: string
}

export default function ChatMessageComponent(props: ChatMessageProps) {
    const words = useMemo(() => {
        const separated = props.text.split(" ");
        for (let i = 0; i < separated.length; i++) {
            let word = separated[i];
            if (word.startsWith(":") && word.endsWith(":") && word.length > 2) {
                word = word.substring(1, word.length - 1);
                separated[i] = word;
                console.log(word);
            }
        }
        return separated;
    }, [props.text]);

    return (
        <div className={styles.container}>
            <img className={styles.avatar} src="../resources/images/villianqueen.png" />
            <p className={styles.bubble}>{words.join(" ")}</p>
        </div>
    )
}