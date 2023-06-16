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
    const [activeSrc, setActiveSrc] = useState("");

    useEffect(() => {
        if (!image.current) return;

        image.current.src = src;
        setActiveSrc(image.current.src);
    }, [src]);

    function loadError() {
        if (!image.current) return;
        const newSrc = fallback || "/no-album-art.png";
        setActiveSrc(newSrc);
    }

    function loadSuccess() {
        setLoading(false);
        if (!image.current) return;
        setActiveSrc(image.current.src);
        if (onLoad) onLoad();
    }

    return (
        <div className={styles.container}>
            {loading && (
                <LoadingAnimComponent title={loadingTitle} />
            )}
            
            <img ref={image} className={styles.image + (loading ? "" : ` ${styles.loaded}`)} src={activeSrc} onLoadStart={() => setLoading(true)} onError={loadError} onLoad={loadSuccess} />
        </div>
        
    )
}