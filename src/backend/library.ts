import Axios from "axios";

export class File {
    filename: string
    dateModified: number
    size: number
}

const listeners: ((files: File[]) => void)[] = [];
const library: File[] = [];

Axios.get("https://assets.airstrike.tv").then(data => {
    if (data.status == 200 && Array.isArray(data.data)) {
        const newLibrary: File[] = [];
        for (let item of data.data) {
            if (item.type == "file") {
                newLibrary.push({
                    filename: item.name,
                    dateModified: (new Date(item.mtime)).getTime(),
                    size: item.size
                });
            }
        }
        library.splice(0, library.length, ...newLibrary);
    }
});




const Library = {
    addListener: (listener: (files: File[]) => void) => {
        if (!listeners.includes(listener)) {
            listeners.push(listener);
        }
    },
    removeListener: (listener: (files: File[]) => void) => {
        const index = listeners.indexOf(listener);
        if (index >= 0) {
            listeners.splice(index, 1);
        }
    },
    get: () => [...library]
}

export default Library;