import { Movie } from "../backend/meta";
import { electron } from "../utils";

const usedIds: string[] = [];
const cachedMetas: Map<string, Movie> = new Map();

electron().addEventListener("metadata", data => {
    const meta = data.metadata as Movie;
    if (meta) {
        cachedMetas.set(meta.filename, meta);
        setTimeout(() => {
            cachedMetas.delete(meta.filename);
        }, 3600_000);
    }
});

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

export default class MetaUtils {
    static get(filename: string) {
        return cachedMetas.get(filename);
    }

    static search(filename: string) {
        const id = generateId();

        return new Promise<Movie>((resolve, reject) => {
            electron().getMetadata(filename, id);
            function callback(data: any) {
                if (data.requestId != id) return;
                electron().removeEventListener("metadata", callback);
                if (data.metadata) {
                    resolve(data.metadata);
                } else {
                    reject();
                }
            }
    
            electron().addEventListener("metadata", callback);
        });
    }
}