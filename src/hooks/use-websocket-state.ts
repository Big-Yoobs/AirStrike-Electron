import { useEffect, useState } from "react";
import { electron } from "../utils";

export interface WebsocketState {
    connected: boolean
}

let websocketState: WebsocketState = {
    connected: false
};
const listeners: ((state: WebsocketState) => void)[] = [];

electron().addEventListener("websocket state", (state: WebsocketState) => { // subscribe to websocket state event
    websocketState = state;
    for (let callback of listeners) {
        callback(websocketState);
    }
});

export default function useWebsocketState() { // hook for getting whether client is connected to server
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