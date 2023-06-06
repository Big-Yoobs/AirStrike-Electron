import { useEffect, useState } from "react";
import { Movie } from "../backend/meta";
import { electron } from "../utils";

const usedIds: string[] = [];

function generateId() {
    const start = Date.now().toString();
    let id = start;

    let tries = 0;
    while (usedIds.includes(id)) {
        id = start + "-" + ++tries;
    }

    usedIds.push(id);
    setTimeout(() => {
        const index = usedIds.indexOf(id);
        if (index >= 0) {
            usedIds.splice(index, 1);
        }
    });

    return id;
}

export default function useMediaMeta(filename: string): Movie | undefined | null {
    const [meta, setMeta] = useState<Movie | undefined | null>(undefined);

    useEffect(() => {
        let active = true;
        setMeta(undefined);

        const id = generateId();
        electron().getMetadata(filename, id);

        function callback(data: any) {
            if (data.requestId != id || !active) return;
            setMeta(data.metadata || null);
        }

        electron().addEventListener("metadata", callback);

        return () => {
            active = false;
            electron().removeEventListener("metadata", callback);
        }
    }, [filename]);

    return meta;
}