import { useEffect, useState } from "react";
import { electron } from "../utils";

let timestamp = 0;
const listeners: ((isPaused: number) => void)[] = [];

electron().addEventListener("timestamp", (data: number) => { // subscribe to timestamp event
    timestamp = data;

    for (let callback of listeners) {
        callback(timestamp);
    }
});

export default function useTimestamp() { // hook for getting current timestamp of room's media
    const [currentTimestamp, setTimestamp] = useState(timestamp);

    useEffect(() => {
        if (!listeners.includes(setTimestamp)) {
            listeners.push(setTimestamp);
        }

        return () => {
            const index = listeners.indexOf(setTimestamp);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return currentTimestamp;
}