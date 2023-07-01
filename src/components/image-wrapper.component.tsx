import { useEffect, useRef, useState } from "react";
import styles from "../styles/image-wrapper.component.module.scss";
import LoadingAnimComponent from "./loading-anim.component";

export interface ImageWrapperProps {
    src: string
    fallback?: string
    onLoad?: () => void
    loadingTitle?: string
    loadingScale?: number
}

export default function ImageWrapperComponent({src, fallback, onLoad, loadingTitle, loadingScale}: ImageWrapperProps) { // wrapper component for image which handles loading and fallbacks
    const image = useRef<HTMLImageElement>(null);
    const [loading, setLoading] = useState(true);
    const [imgSrc, setSrc] = useState<string | null>(null);
    
    useEffect(() => {
        setLoading(true); // src changed, mark as loading
        const img = new Image();
        let doFallback = false;
        let usingSrc = src;

        function load() { // image load succeeded, stop loading
            setSrc(usingSrc);
            setLoading(false);
            if (onLoad) onLoad();
        }

        function error() { // image load failed, try fallback image if haven't already
            if (doFallback) return;
            doFallback = true;
            usingSrc = fallback || "gui://logo.png";
            img.src = usingSrc;
        }

        img.addEventListener("load", load);
        img.addEventListener("error", error);

        img.src = src; // test loading image
        
        return () => { // clean up
            img.removeEventListener("load", load);
            img.removeEventListener("error", error);
        }
    }, [src]);

    return (
        <div className={styles.container}>
            {loading && (
                <LoadingAnimComponent title={loadingTitle} scale={loadingScale} />
            )}
            
            <img ref={image} className={styles.image + (loading ? "" : ` ${styles.loaded}`)} src={imgSrc} />
        </div>
        
    )
}