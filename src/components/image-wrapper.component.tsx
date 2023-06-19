import { useEffect, useRef, useState } from "react";
import styles from "../styles/image-wrapper.component.module.scss";
import LoadingAnimComponent from "./loading-anim.component";

export interface ImageWrapperProps {
    src: string
    fallback?: string
    onLoad?: () => void
    loadingTitle?: string
}

export default function ImageWrapperComponent({src, fallback, onLoad, loadingTitle}: ImageWrapperProps) {
    const image = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState(true);
    const [imgSrc, setSrc] = useState<string | null>(null);
    
    useEffect(() => {
        setLoading(true);
        const img = new Image();
        let doFallback = false;
        let usingSrc = src;

        function load() {
            setSrc(usingSrc);
            setLoading(false);
            if (onLoad) onLoad();
        }

        function error() {
            if (doFallback) return;
            doFallback = true;
            usingSrc = fallback || "gui://logo.png";
            img.src = usingSrc;
        }

        img.addEventListener("load", load);
        img.addEventListener("error", error);

        img.src = src;
        
        return () => {
            img.removeEventListener("load", load);
            img.removeEventListener("error", error);
        }
    }, [src]);

    return (
        <div className={styles.container}>
            {loading && (
                <LoadingAnimComponent title={loadingTitle} />
            )}
            
            <img ref={image} className={styles.image + (loading ? "" : ` ${styles.loaded}`)} src={imgSrc} />
        </div>
        
    )
}