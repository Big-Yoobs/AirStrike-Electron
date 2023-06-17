import { useEffect, useState } from "react";
import { electron } from "../utils";

let url: string | null = null;
const listeners: ((url: string | null) => void)[] = [];

interface ElectronResponse {
    room: string
    url: string | null
}

electron().addEventListener("url", (data: ElectronResponse) => {
    url = data.url;

    for (let callback of listeners) {
        callback(url);
    }
});

export default function useRoomUrl() {
    const [currentUrl, setCurrentUrl] = useState(url);

    useEffect(() => {
        if (!listeners.includes(setCurrentUrl)) {
            listeners.push(setCurrentUrl);
        }

        return () => {
            const index = listeners.indexOf(setCurrentUrl);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return currentUrl;
}