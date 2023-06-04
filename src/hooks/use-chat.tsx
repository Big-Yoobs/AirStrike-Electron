import { useEffect, useState } from "react";
import { electron } from "../utils";

const chat: string[] = [];
const listeners: ((chat: string[]) => void)[] = [];

electron().addEventListener("chat", (message: string) => {
    chat.push(message);
    const newChat = [...chat];
    for (let callback of listeners) {
        callback(newChat);
    }
});

export default function useChat(): string[] {
    const [messages, setMessages] = useState(chat);

    useEffect(() => {
        if (!listeners.includes(setMessages)) {
            listeners.push(setMessages);
        }

        return () => {
            const index = listeners.indexOf(setMessages);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return messages;
}