import { useEffect, useState } from "react";
import { electron } from "../utils";

export interface ChatMessage {
    sender: string
    message: string
}

const chat: ChatMessage[] = [];
const listeners: ((chat: ChatMessage[]) => void)[] = [];

electron().addEventListener("chat", (message: ChatMessage) => {
    chat.push(message);
    const newChat = [...chat];
    for (let callback of listeners) {
        callback(newChat);
    }
});

export default function useChat(): ChatMessage[] {
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