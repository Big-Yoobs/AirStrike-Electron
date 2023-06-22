import { useEffect, useState } from "react";
import { Movie } from "../backend/meta";
import MetaUtils from "../logic/meta-utils";

export default function useMediaMeta(filename: string): Movie | undefined | null {
    const [meta, setMeta] = useState<Movie | undefined | null>(MetaUtils.get(filename));

    useEffect(() => {
        if (meta && meta.filename == filename) return;

        let active = true;
        setMeta(undefined);

        MetaUtils.search(filename).then(data => {
            if (active) {
                setMeta(data);
            }
        }).catch(() => {
            if (active) {
                setMeta(null);
            }
        });

        return () => {
            active = false;
        }
    }, [filename]);

    return meta;
}