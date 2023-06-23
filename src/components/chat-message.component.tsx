import { useMemo } from "react"
import styles from "../styles/chat-message.component.module.scss"
import EmojiComponent from "./emoji.component";
import AvatarGuiComponent from "./avatar-gui.component";
import { electron } from "../utils";
import { ChatMessage } from "../hooks/use-chat";

const emojis: string[] = [];

electron().addEventListener("emojis", (newEmojis: string[]) => {
    emojis.splice(0, emojis.length, ...newEmojis);
});

export interface ChatMessageProps {
    message: ChatMessage
}

export default function ChatMessageComponent({ message }: ChatMessageProps) {
    const words = useMemo(() => {
        const separated = message.message.split(" ");
        const out: JSX.Element[] = [];
        for (let i = 0; i < separated.length; i++) {
            let word = separated[i];
            if (word.startsWith("\\") && word.endsWith("\\") && word.length > 2) {
                const emojiName = word.substring(1, word.length - 1);
                if (emojis.includes(emojiName)) {
                    out.push(<EmojiComponent emoji={emojiName} key={i} />);
                    continue;
                }
            }
            if (i == separated.length - 1) {
                out.push(<span key={i}>{word}</span>);
            } else {
                out.push(<span key={i}>{word} </span>);
            }
        }
        return out;
    }, [message]);

    let isOnlyEmojis = true;
    for (let word of words) {
        if (word.props.children) isOnlyEmojis = false;
    }

    return (
        <div className={styles.container}>
            <div className={styles.avatarContainer}>
                <AvatarGuiComponent avatar={message.sender} />
            </div>
            {isOnlyEmojis ? (
                <div className={styles.emojis}>{words}</div>
            ) : (
                <p className={styles.bubble}>{words}</p>
            )}
        </div>
    )
}