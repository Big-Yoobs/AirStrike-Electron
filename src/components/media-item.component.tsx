import useMediaMeta from '../hooks/use-media-meta';
import styles from '../styles/media-item.component.module.scss';
import LoadingAnimComponent from "./loading-anim.component";
import ImageWrapperComponent from './image-wrapper.component';
import { BsPlayFill } from "react-icons/bs";
import { File } from '../backend/library';
import { useMemo } from 'react';
import StringSimilarity from "string-similarity";

export interface MediaItemComponentProps {
    media: File
    onClick?: () => void
    scale?: number
    searchQuery?: string
}

export default function MediaItemComponent({ media, onClick, scale, searchQuery }: MediaItemComponentProps) {
    const meta = useMediaMeta(media.filename);
    const shouldDisplay = useMemo(() => {
        if (!searchQuery) return true;
        if (!meta) return false;
        const lower = searchQuery.toLowerCase();
        const lowerName = meta.details.title.toLowerCase();
        if (lowerName.includes(lower) || StringSimilarity.compareTwoStrings(lowerName, lower) > 0.5) {
            return true;
        }
        if (meta.details.release_date.split("-")[0] == searchQuery) {
            return true;
        }
        for (let member of [...meta.credits.cast, ...meta.credits.crew]) {
            const lowerMemberName = member.name.toLowerCase();
            if (lowerMemberName.includes(searchQuery) || StringSimilarity.compareTwoStrings(lowerMemberName, lower) > 0.8) {
                return true;
            }
        }
        return false;
    }, [searchQuery, meta]);

    const css = useMemo(() => {
        return {"--scale": scale || 1} as any;
    }, [scale]);

    if (!shouldDisplay) return null;

    if (!meta) {
        return (
            <div className={styles.container} style={css}>
                <div className={styles.image}>
                    <LoadingAnimComponent scale={scale} />
                </div>
                <h1 className={styles.loadingTitle}>{media.filename}</h1>
            </div>
        )
    }

    const releaseYear = meta.details.release_date.split("-").shift();

    return (
        <div className={styles.container} style={css}>
            <div className={styles.image}>
                <ImageWrapperComponent src={"https://image.tmdb.org/t/p/w500/" + meta.details.poster_path} loadingTitle={meta.details.title} loadingScale={scale} />
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