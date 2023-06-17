import { useEffect, useState } from "react";
import { electron } from "../utils";

let isBuffering = false;
const listeners: ((isBuffering: boolean) => void)[] = [];

electron().addEventListener("buffering", (data: boolean) => {
    isBuffering = data;

    for (let callback of listeners) {
        callback(isBuffering);
    }
});

export default function useBuffering() {
    const [buffering, setBuffering] = useState(isBuffering);

    useEffect(() => {
        if (!listeners.includes(setBuffering)) {
            listeners.push(setBuffering);
        }

        return () => {
            const index = listeners.indexOf(setBuffering);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return buffering;
}