import { useEffect, useState } from "react";
import { electron } from "../utils";

let roomId: string | null = null;
const listeners: ((roomId: string | null) => void)[] = [];

electron().addEventListener("room ID", (id: string) => {
    console.log(id);
    roomId = id;
    for (let callback of listeners) {
        callback(roomId);
    }
});

export default function useRoomId(): string | null {
    const [id, setId] = useState(roomId);

    useEffect(() => {
        if (!listeners.includes(setId)) {
            listeners.push(setId);
        }

        return () => {
            const index = listeners.indexOf(setId);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return id;
}