import { useEffect, useState } from "react";
import { electron } from "../utils";
import { MovieMetadata } from "../backend/meta";

export interface FileContainer {
    filename: string
    meta?: MovieMetadata
}

const files: FileContainer[] = [];
const listeners: ((files: FileContainer[]) => void)[] = [];

electron().addEventListener("library", data => {
    for (let item of files) {
        if (!data.includes(item.filename)) {
            files.splice(files.indexOf(item), 1);
            data.splice(data.indexOf(item.filename), 1);
        }
    }

    for (let filename of data) {
        files.push({
            filename
        });
    }

    for (let callback of listeners) {
        callback([...files]);
    }
});

export default function useLibrary() {
    const [currentFiles, setFiles] = useState(files);

    useEffect(() => {
        if (!listeners.includes(setFiles)) {
            listeners.push(setFiles);
        }

        return () => {
            const index = listeners.indexOf(setFiles);
            if (index >= 0) {
                listeners.splice(index, 1);
            }
        }
    }, []);

    return currentFiles;
}