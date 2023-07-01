import { useEffect, useState } from "react";
import { electron } from "../utils";

let isPaused = false;
const listeners: ((isPaused: boolean) => void)[] = [];

electron().addEventListener("paused", (data: boolean) => { // subscribe to paused event
    isPaused = data;

    for (let callback of listeners) {
        callback(isPaused);
    }
});

export default function usePaused() { // hook for getting whether the current room is paused
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