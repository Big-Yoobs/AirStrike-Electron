import { useEffect, useState } from "react";
import { electron } from "../utils";


const medias: string[] = [];
const listeners: ((files: string[]) => void)[] = [];

electron().addEventListener("local media", (data: string[]) => {

    medias.splice(0, medias.length, ...data);

    for (let callback of listeners) {
        callback([...medias]);
    }
});

export default function useLocalMedias() {
    const [currentMedias, setMedias] = useState(medias);

    useEffect(() => {
        if (!listeners.includes(setMedias)) {
            listeners.push(setMedias);
        }

        return () => {
            const index = listeners.indexOf(setMedias);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return currentMedias;
}