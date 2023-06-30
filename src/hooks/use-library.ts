import { useEffect, useState } from "react";
import { electron } from "../utils";
import { File } from "../backend/library";


const files: File[] = [];
const listeners: ((files: File[]) => void)[] = [];

electron().addEventListener("library", (data: File[]) => { // subscribe to library event
    const filenames = data.map(file => file.filename);

    for (let item of files) { // update file list
        if (!filenames.includes(item.filename)) {
            files.splice(files.indexOf(item), 1);
        } else {
            data.splice(data.indexOf(item), 1);
        }
    }

    files.unshift(...data);

    for (let callback of listeners) {
        callback([...files]);
    }
});

export default function useLibrary() { // hook for getting library files
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