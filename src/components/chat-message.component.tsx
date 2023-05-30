import { useMemo } from "react"
import styles from "../styles/chat-message.component.module.scss"
import EmojiComponent from "./emoji.component";

export interface ChatMessageProps {
    text: string
}

export default function ChatMessageComponent(props: ChatMessageProps) {
    const words = useMemo(() => {
        const separated = props.text.split(" ");
        const out: JSX.Element[] = [];
        for (let i = 0; i < separated.length; i++) {
            let word = separated[i];
            if (word.startsWith(":") && word.endsWith(":") && word.length > 2) {
                word = word.substring(1, word.length - 1);
                out.push(<EmojiComponent emoji={word} key={i} />)
            } else if (i == separated.length - 1) {
                out.push(<span key={i}>{word}</span>);
            } else {
                out.push(<span key={i}>{word} </span>);
            }
        }
        return out;
    }, [props.text]);

    return (
        <div className={styles.container}>
            <img className={styles.avatar} src="avatar://villainbiden" />
            <p className={styles.bubble}>{words}</p>
        </div>
    )
}