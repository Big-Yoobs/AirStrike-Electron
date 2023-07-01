import { useEffect, useState } from "react";
import { electron } from "../utils";

let roomId: string | null = null;
const listeners: ((roomId: string | null) => void)[] = [];

electron().addEventListener("room ID", (id: string | null) => { // subscribe to room change hook
    roomId = id;
    for (let callback of listeners) {
        callback(roomId);
    }
});

electron().addEventListener("url", ({room}: {room: string}) => { // subscribe to url change hook (sometimes used to give client a room id as well)
    roomId = room;
    for (let callback of listeners) {
        callback(roomId);
    }
});

electron().addEventListener("error", (e: string) => { // subscribe to error hook to detect room kick
    if (roomId != null && e == "You're not in a room") {
        roomId = null;
        for (let callback of listeners) {
            callback(roomId);
        }
    }
});

export default function useRoomId(): string | null { // hook for getting the current room id
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