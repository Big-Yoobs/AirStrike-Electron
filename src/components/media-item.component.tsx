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

    return (
        <div className={styles.container}>
            <div className={styles.primaryContainer}>
                <div className={styles.imageContainer}>
                    {meta ? (
                        <ImageWrapperComponent src={"https://image.tmdb.org/t/p/w500/" + meta.details.poster_path} />
                    ) : (
                        <LoadingAnimComponent />
                    )}
                </div>
                <div className={styles.textContainer}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.secondLineContainer}>
                        <div className={styles.year}>{releaseYear}</div>
                        {watched ? (
                            <div className={styles.watchedContainer}>
                                <BsFillCheckCircleFill />
                            </div>
                        ) : null}                
                    </div>
                </div>
            </div>	
            <div className={styles.secondarySlide}>
                <div className={styles.secondaryContainer}>
                    <div className={styles.secOverlay}></div>  
                    <div className={styles.secText}> 
                        <div className={styles.secTitle}>{title}</div>
                        <div className={styles.secSubtitle}>
                            <div className={styles.year}>Release: <span>{releaseYear}</span></div>
                        </div>
                        <div className={styles.desc}>{meta?.details.overview}</div>
                    </div>
                </div>           
            </div>
        </div>

    )
    
}