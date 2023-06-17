import { useEffect, useState } from "react";
import { electron } from "../utils";

let isPaused = false;
const listeners: ((isPaused: boolean) => void)[] = [];

electron().addEventListener("paused", (data: boolean) => {
    isPaused = data;

    for (let callback of listeners) {
        callback(isPaused);
    }
});

export default function usePaused() {
    const [paused, setPaused] = useState(isPaused);

    useEffect(() => {
        if (!listeners.includes(setPaused)) {
            listeners.push(setPaused);
        }

        return () => {
            const index = listeners.indexOf(setPaused);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return paused;
}