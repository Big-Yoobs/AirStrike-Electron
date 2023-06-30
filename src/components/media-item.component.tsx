import styles from '../styles/media-item.component.module.scss';
import LoadingAnimComponent from "./loading-anim.component";
import ImageWrapperComponent from './image-wrapper.component';
import { BsPlayFill } from "react-icons/bs";
import { File } from '../backend/library';
import { useMemo } from 'react';
import { Movie } from '../backend/meta';
import useRoomId from '../hooks/use-room-id';
import { electron } from '../utils';

export interface MediaItemComponentProps {
    file: File
    meta: Movie
    onClick?: () => void
    scale?: number
}

export default function MediaItemComponent({ file, meta, onClick, scale }: MediaItemComponentProps) {
    const roomId = useRoomId();

    const css = useMemo(() => {
        return {"--scale": scale || 1} as any;
    }, [scale]);

    //loading animation whilst no metadata exists for media item
    if (!meta) {
        return (
            <div className={styles.container} style={css} data-firstletter={file.filename.slice(0, 1).toUpperCase()}>
                <div className={styles.image}>
                    <LoadingAnimComponent scale={scale} />
                </div>
                <h1 className={styles.loadingTitle}>{file.filename}</h1>
            </div>
        )
    }

    //release year based on release date
    const releaseYear = meta.details.release_date.split("-").shift();

    //clicking the play icon within the media item
    function directPlay(e: React.MouseEvent) {
        e.stopPropagation();
        e.preventDefault();
        if (roomId) { //use current room if it exists
            electron().socketSend("url", "https://assets.airstrike.tv/" + file.filename);
        } else { //create a new room if it doesn't
            electron().socketSend("create room", "https://assets.airstrike.tv/" + file.filename);
        }
    }

    //Finding the first letter of a title when it starts with "The" by ignoring it.
    const firstLetter = (meta.details.title.toLowerCase().startsWith("the ") ? meta.details.title.slice(4, 5) : meta.details.title.slice(0, 1)).toUpperCase();

    return (
        <div className={styles.container} style={css} data-firstletter={firstLetter}>
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
                <button className={styles.play} onClick={directPlay}><BsPlayFill /></button>
            </div>
        </div>
    )
}