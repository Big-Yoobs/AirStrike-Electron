import styles from '../styles/film-page.component.module.scss';
import {BsPlayFill} from 'react-icons/bs';
import {FaUserFriends} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import useMediaMeta from '../hooks/use-media-meta';
import ImageWrapperComponent from './image-wrapper.component';

export interface FilmPageComponentProps {
    filename: string
}

export default function FilmPageComponent({ filename } : FilmPageComponentProps) {
    const meta = useMediaMeta(filename);

    if (meta === null) {
        return <h1>Failed to load</h1>
    }

    if (!meta) {
        return <h1>Loading...</h1>
    }

    const title : string = meta.details.title;
    const coverSrc : string = "https://image.tmdb.org/t/p/w500/" + meta.details.poster_path;
    const bgSrc : string = "https://image.tmdb.org/t/p/original/" + meta.details.backdrop_path;
    
    const release = new Date(meta.details.release_date).toLocaleDateString("en-NZ", {year: "numeric", month: "long", day: "numeric"});



    const director : string = meta.credits.crew.find((person) => person.job === "Director").name;
    const desc : string = meta.details.overview;
    const runtime : number = meta.details.runtime;
    const length : number[] = [runtime / 60, runtime % 60];
    const watched : boolean = true;

    


    return (

        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.bgImg}>
                    <ImageWrapperComponent src={bgSrc}/>
                    <div className={styles.bgImgOverlay}></div>
                    <div className = {styles.coverContainer}>
                        <ImageWrapperComponent src={coverSrc}/>
                    </div>
                </div>

                <div className={styles.txtHeader}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.txtHeaderSecLine}>

                        <div className={styles.director}>
                            <span className={styles.tag}>Director: </span> 
                            <span>{director}</span>
                        </div>

                        <div className={styles.release}>
                            <span className={styles.tag}>Release: </span>
                            <span>{release}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.btnsContainer}>
                    <div className={styles.btn}>
                        <div className={styles.btnIcon}>
                            <BsPlayFill/>
                        </div>
                        <div className={styles.btnText}>Play</div>
                    </div>

                    <div className={styles.btn}>
                        <div className={styles.btnIcon}>
                            <FaUserFriends/>
                        </div>
                        <div className={styles.btnText}>Start Room</div>
                    </div>

                    <div className={`${styles.btn} ${styles.editBtn}`}>
                        <div className={styles.btnIcon}>
                            <AiFillEdit/>
                        </div>
                    </div>

                    {watched ? (
                            <div className={styles.watchedContainer}>
                                <BsFillCheckCircleFill />
                            </div>
                        ) : null
                    }
                                        
                </div>
            </div>

            <div className={styles.body}>
                <div className={styles.description}>
                    <div className={styles.descriptionTitle}>Description</div>
                    <div className={styles.descriptionText}>
                        {desc}
                    </div>
                </div>
            </div>

        </div>
    )

}