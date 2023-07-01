import { electron } from "../utils";
import styles from "../styles/emoji-selection.component.module.scss";
import EmojiComponent from "./emoji.component";
import { useEffect, useRef, useState } from "react";
import StringSimilarity from "string-similarity";

const emojis: string[] = [];

electron().addEventListener("emojis", (newEmojis: string[]) => { // subscribe to emojis event to keep track of all known emojis
    emojis.splice(0, emojis.length, ...newEmojis);
});

export interface EmojiSelectionComponentProps {
    autoComplete?: string
    onSelect?: (emoji: string) => void
    onSuggestionChange?: (emoji: string) => void
}

export default function EmojiSelectionComponent(props: EmojiSelectionComponentProps) { // component for selecting an emoji with autocompletion and string similarity support
    const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
    const container = useRef<HTMLDivElement>(null);

    function mouseLeft(emoji: string) {
        setSelectedEmoji(current => {
            if (current == emoji) return null;
            return current;
        })
    }

    useEffect(() => {
        if (props.autoComplete) {
            const match = StringSimilarity.findBestMatch(props.autoComplete, emojis);
            const emoji = match.bestMatch.target;
            setSelectedEmoji(emoji);
            const element = container.current.querySelector(`span[data-id=${emoji}]`);
            element.scrollIntoView();
        } else {
            setSelectedEmoji(null);
        }
    }, [props.autoComplete]);

    function emojiSelect(emoji: string) {
        if (props.onSelect) props.onSelect(emoji);
    }

    useEffect(() => {
        if (props.onSuggestionChange) props.onSuggestionChange(selectedEmoji);
    }, [selectedEmoji]);

    return (
        <div className={styles.container}>
            <h2 className={styles.preview}>{selectedEmoji && `\\${selectedEmoji}\\`}</h2>
            <div className={styles.emojis}>
                <div className={styles.emojiFlex} ref={container}>
                    {emojis.map(emoji => (
                        <span className={styles.emoji + (selectedEmoji == emoji ? ` ${styles.selected}` : "")} key={emoji} data-id={emoji} onMouseEnter={() => setSelectedEmoji(emoji)} onMouseLeave={() => mouseLeft(emoji)} onClick={() => emojiSelect(emoji)}>
                            <EmojiComponent emoji={emoji} />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}