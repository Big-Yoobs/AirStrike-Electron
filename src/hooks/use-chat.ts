import { useEffect, useState } from "react";
import { electron } from "../utils";

export interface ChatMessage {
    sender: string
    message: string
}

const chat: ChatMessage[] = [];
const listeners: ((chat: ChatMessage[]) => void)[] = [];

electron().addEventListener("chat", (message: ChatMessage) => { // subscribe to chat event
    chat.push(message);
    const newChat = [...chat];
    for (let callback of listeners) {
        callback(newChat);
    }
});

electron().addEventListener("room ID", (id: string | null) => { // subscribe to room change event
    if (id) return;
    chat.splice(0, chat.length); // clear chat
    for (let callback of listeners) {
        callback([]);
    }
});

export default function useChat() { // get room chat messages
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