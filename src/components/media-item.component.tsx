import useMediaMeta from '../hooks/use-media-meta';
import styles from '../styles/media-item.component.module.scss';
import LoadingAnimComponent from "./loading-anim.component";
import ImageWrapperComponent from './image-wrapper.component';
import { BsPlayFill } from "react-icons/bs";
import { useEffect, useState } from 'react';
import { File } from '../backend/library';

export interface MediaItemComponentProps {
    media: File
    onClick?: () => void
}

export default function MediaItemComponent({ media, onClick }: MediaItemComponentProps) {
    const meta = useMediaMeta(media.filename);

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

    const releaseYear = meta.details.release_date.split("-").shift();

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <ImageWrapperComponent src={"https://image.tmdb.org/t/p/w500/" + meta.details.poster_path} loadingTitle={meta.details.title} />
            </div>
            <div className={styles.info} onClick={onClick}>
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