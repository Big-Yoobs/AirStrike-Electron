import { useMemo } from "react"
import styles from "../styles/chat-message.component.module.scss"
import EmojiComponent from "./emoji.component";
import { electron } from "../utils";

const emojis: string[] = [];

electron().addEventListener("emojis", (newEmojis: string[]) => {
    emojis.splice(0, emojis.length, ...newEmojis);
});

export interface ChatMessageProps {
    text: string
}

export default function ChatMessageComponent(props: ChatMessageProps) {
    const words = useMemo(() => {
        const separated = props.text.split(" ");
        const out: JSX.Element[] = [];
        for (let i = 0; i < separated.length; i++) {
            let word = separated[i];
            if (word.startsWith("\\") && word.endsWith("\\") && word.length > 2) {
                const emojiName = word.substring(1, word.length - 1);
                if (emojis.includes(emojiName)) {
                    out.push(<EmojiComponent emoji={emojiName} key={i} />);
                    break;
                }
            }
            if (i == separated.length - 1) {
                out.push(<span key={i}>{word}</span>);
            } else {
                out.push(<span key={i}>{word} </span>);
            }
        }
        return out;
    }, [props.text]);

    let isOnlyEmojis = true;
    for (let word of words) {
        if (word.props.children) isOnlyEmojis = false;
    }

    return (
        <div className={styles.container}>
            <img className={styles.avatar} src="avatar://villainbiden" />
            {isOnlyEmojis ? (
                <div className={styles.emojis}>{words}</div>
            ) : (
                <p className={styles.bubble}>{words}</p>
            )}
        </div>
    )
}