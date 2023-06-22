import { useEffect, useState } from "react";
import { File } from "../backend/library";
import { Movie } from "../backend/meta";
import MetaUtils from "../logic/meta-utils";

export interface MediaMetaWrapper {
    file: File
    state: "found" | "not-found" | "searching" | "preparing"
    meta?: Movie | null
}

export default function useMediaMetas(files: File[]) {
    const [metas, setMetas] = useState<MediaMetaWrapper[]>(files.map(file => {
        const meta = MetaUtils.get(file.filename) || null;

        return {
            file,
            state: meta ? "found" : "preparing",
            meta
        }
    }));

    useEffect(() => {
        const existingFiles: Map<File, MediaMetaWrapper> = new Map();
        for (let meta of metas) {
            existingFiles.set(meta.file, meta);
        }

        const newMetas: MediaMetaWrapper[] = [];
        let changed = files.length != metas.length;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!changed && metas[i].file != file) {
                changed = true;
            }

            let meta: MediaMetaWrapper | undefined;
            const existing = existingFiles.get(file);
            if (existing) {
                meta = existing;
            } else {
                meta ={
                    file,
                    state: "preparing"
                }
            }
            newMetas.push(meta);
            if (meta.state == "preparing") {
                changed = true;
                meta.state = "searching";
                MetaUtils.search(meta.file.filename).then(data => {
                    meta.state = "found";
                    meta.meta = data;
                }).catch(() => {
                    meta.state = "not-found";
                }).finally(() => {
                    setMetas(currentMetas => {
                        if (currentMetas.includes(meta)) {
                            return [...currentMetas];
                        }
                        return currentMetas;
                    })
                });
            }
        }

        if (changed) {
            setMetas(newMetas);
        }
    }, [files]);

    return metas;
}