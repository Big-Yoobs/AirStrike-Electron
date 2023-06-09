import useMediaMeta from '../hooks/use-media-meta';
import { FileContainer } from '../hooks/use-library';
import styles from '../styles/media-item.component.module.scss';
import LoadingAnimComponent from "./loading-anim.component";
import ImageWrapperComponent from './image-wrapper.component';
import { BsPlayFill } from "react-icons/bs";
import { useEffect, useState } from 'react';

export interface MediaItemComponentProps {
    media: FileContainer
}

export default function MediaItemComponent({ media }: MediaItemComponentProps) {
    const meta = useMediaMeta(media.filename);
    const [imageLoaded, setImageLoaded] = useState(false);
    
    const title = meta?.details.title || media.filename;
    const watched = false;

    const releaseYear = meta ? meta.details.release_date.split("-").shift() : undefined;

    useEffect(() => {
        setImageLoaded(false);
    }, [media.filename]);

    if (!meta) {
        return (
            <div className={styles.container}>
                <div className={styles.image}>
                    <LoadingAnimComponent />
                </div>
                <h1 className={styles.loadingTitle}>{media.filename}</h1>
            </div>
        )
    }

    if (!imageLoaded) {
        return (
            <div className={styles.container}>
                <div className={styles.image}>
                <ImageWrapperComponent src={"https://image.tmdb.org/t/p/w500/" + meta.details.poster_path} onLoad={() => setImageLoaded(true)} />
                </div>
                <h1 className={styles.loadingTitle}>{media.filename}</h1>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <ImageWrapperComponent src={"https://image.tmdb.org/t/p/w500/" + meta.details.poster_path} onLoad={() => setImageLoaded(true)} />
            </div>
            <div className={styles.info}>
                <div className={styles.bottom}>
                    <div className={styles.split}>
                        <h1 className={styles.title}>{meta.details.title}</h1>
                        <span className={styles.rating}>{releaseYear}</span>
                    </div>
                </div>
                <button className={styles.play}><BsPlayFill /></button>
            </div>
        </div>
    )
    
}