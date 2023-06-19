import { useCallback, useEffect, useRef, useState } from "react";
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
    const [imgSrc, setSrc] = useState(src || "/no-album-art.png");

    const onImageLoad = useCallback(() => {
        setSrc(src);
        setLoading(false);
    }, [src]);
    
    useEffect(() => {
        setLoading(true);
        const img = new Image();
        setTimeout(() => {
            img.src = src;
        });
        img.addEventListener("load", onImageLoad);
        
        return () => {
            img.removeEventListener("load", onImageLoad);
        }
    }, [src, onImageLoad]);

    return (
        <div className={styles.container}>
            {loading && (
                <LoadingAnimComponent title={loadingTitle} />
            )}
            
            <img ref={image} className={styles.image + (loading ? "" : ` ${styles.loaded}`)} src={imgSrc} />
        </div>
        
    )
}