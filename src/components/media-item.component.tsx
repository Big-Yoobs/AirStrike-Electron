import useMediaMeta from '../hooks/use-media-meta';
import { FileContainer } from '../hooks/use-library';
import styles from '../styles/media-item.component.module.scss';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import LoadingAnimComponent from "./loading-anim.component";
import ImageWrapperComponent from './image-wrapper.component';

export interface MediaItemComponentProps {
    media: FileContainer
}

export default function MediaItemComponent({ media }: MediaItemComponentProps) {
    const meta = useMediaMeta(media.filename);

    console.log(meta);
    
    const title = meta?.details.title || media.filename;
    const watched = false;

    const releaseYear = meta ? meta.details.release_date.split("-").shift() : undefined;

    if (!meta) {
        return (
            <div className={styles.container}>
                <div className={styles.image}>
                    <LoadingAnimComponent />
                </div>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <ImageWrapperComponent src={"https://image.tmdb.org/t/p/w500/" + meta.details.poster_path} />
            </div>
            <div className={styles.info}>
                <div className={styles.bottom}>
                    <h1 className={styles.title}>{meta.details.title}</h1>
                </div>
                
            </div>
        </div>
    )
    
}