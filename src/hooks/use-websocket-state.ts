import { useEffect, useState } from "react";
import { electron } from "../utils";

export interface WebsocketState {
    connected: boolean
}

let websocketState: WebsocketState = {
    connected: false
};
const listeners: ((state: WebsocketState) => void)[] = [];

electron().addEventListener("websocket state", (state: WebsocketState) => {
    websocketState = state;
    for (let callback of listeners) {
        callback(websocketState);
    }
});

export default function useWebsocketState() {
    const [state, setState] = useState(websocketState);

    useEffect(() => {
        if (!listeners.includes(setState)) {
            listeners.push(setState);
        }

        return () => {
            const index = listeners.indexOf(setState);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return state;
}