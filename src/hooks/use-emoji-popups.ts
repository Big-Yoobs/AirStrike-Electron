import { useEffect, useState } from "react";
import EmojiPopups from "../logic/emoji-popups";

export default function useEmojiPopups() { // get emoji popups
    const [emojis, setEmojis] = useState(EmojiPopups.get());

    useEffect(() => {
        EmojiPopups.addEventListener(setEmojis);

        return () => {
            EmojiPopups.removeEventListener(setEmojis);
        }
    }, []);

    return emojis;
}