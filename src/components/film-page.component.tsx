import styles from '../styles/film-page.component.module.scss';
import {BsPlayFill} from 'react-icons/bs';
import {FaUserFriends} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import useMediaMeta from '../hooks/use-media-meta';
import ImageWrapperComponent from './image-wrapper.component';
import {MdOutlineArrowBackIos} from 'react-icons/md';
import { MovieCrewMember } from '../backend/meta';
import CastPfpComponent from './cast-pfp.component';
import LoadingAnimComponent from './loading-anim.component';

export interface FilmPageComponentProps {
    filename: string
    onBack?: () => void
}

export default function FilmPageComponent({ filename, onBack } : FilmPageComponentProps) {
    const meta = useMediaMeta(filename);

    if (meta === null) {
        return <h1>Failed to load</h1>
    }

    if (!meta) {
        return <LoadingAnimComponent title={filename} />
    }

    const title : string = meta.details.title;
    const coverSrc : string = "https://image.tmdb.org/t/p/w500/" + meta.details.poster_path;
    const bgSrc : string = "https://image.tmdb.org/t/p/original/" + meta.details.backdrop_path;
    
    const release = new Date(meta.details.release_date).toLocaleDateString("en-NZ", {year: "numeric", month: "long", day: "numeric"});
    const directors: MovieCrewMember[] = [];
    const writers: MovieCrewMember[] = [];
    for (let member of meta.credits.crew) {
        if (member.job === "Director") {
            directors.push(member);
        } else if (member.job === "Writer" || member.job === "Screenplay") {
            writers.push(member);
        }

    }

    const desc : string = meta.details.overview;
    const runtime : number = meta.details.runtime;
    const length : number[] = [Math.floor(runtime / 60), runtime % 60];
    const watched : boolean = true;
    const userScore : number = Math.round(meta.details.vote_average * 10);
    const scoreThresholds: { [key: number]: string } = {
        0: "Very Bad",
        20: "Bad",
        40: "Average",
        60: "Good",
        80: "Very Good",
        90: "Excellent"
    };
    let userScoreTitle: string;
      
    for (const threshold in scoreThresholds) {
        if (userScore >= Number(threshold)) {
            userScoreTitle = scoreThresholds[threshold];
        }
    }

    return (

        <div className={styles.container}>
            <div>
                <div className={styles.bgImg}>
                    <button className={styles.backBtn} onClick={onBack}>
                        <MdOutlineArrowBackIos/>
                    </button>
                    <ImageWrapperComponent src={bgSrc}/>
                    <div className={styles.bgImgOverlay}></div>
                    <div className = {styles.coverContainer}>
                        <ImageWrapperComponent src={coverSrc}/>
                    </div>
                </div>

                <div className={styles.txtHeader}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.txtHeaderSecLine}>

                        
                        <div>
                            <span className={styles.tag}>Director: </span>
                            <span>{directors.map(d => d.name).join(", ")}</span>
                        </div>

                        <div>
                            <span className={styles.tag}>Writer: </span>
                            <span>{writers.map(w => w.name).join(", ")}</span>
                        </div>                       

                        <div>
                            <span className={styles.tag}>Release: </span>
                            <span>{release}</span>
                        </div>

                        <div>
                            <span className={styles.tag}>Length: </span>
                            <span>{length[0]}h {length[1]}m</span>
                        </div>

                        <div>
                            <span className={styles.tag}>Genres: </span>
                            <span>{meta.details.genres.map(g => g.name).join(", ")}</span>
                        </div>

                        <div>
                            <span className={styles.tag}>User Score: </span>
                            <span>{userScore}%  </span>
                            <span>{userScoreTitle}</span>
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

                    {/* <div className={styles.btn}>
                        <div className={styles.btnIcon}>
                            <FaUserFriends/>
                        </div>
                        <div className={styles.btnText}>Start Room</div>
                    </div> */}

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
                    <div className={styles.bodyTitle}>Description</div>
                    <div>
                        {desc}
                    </div>
                </div>

                <div className={styles.bodyTitleContainer}>    
                    <div className={styles.bodyTitle}>Cast</div>
                </div>
                <div className={styles.castContainer}>
                    <div className={`${styles.arrow}`}>
                        <MdOutlineArrowBackIos/>
                    </div>
                    <div className={styles.cast}>
                        {meta.credits.cast.map(c => (
                            <CastPfpComponent member={c} />
                        ))}
                    </div>
                    <div className={`${styles.arrowRight} ${styles.arrow}`}>
                        <MdOutlineArrowBackIos/>
                    </div>
                </div>

                <div className={styles.bodyTitleContainer}>
                    <div className={styles.bodyTitle}>Reviews</div>
                </div>
                <div>
                    {/* TODO: add reviews here */}
                </div>

                <div className={styles.bodyTitleContainer}>
                    <div className={styles.bodyTitle}>Related</div>
                </div>
                <div>
                    {/* TODO: add related films here */}
                </div>

                <div className={styles.bodyTitleContainer}>
                    <div className={styles.bodyTitle}>Crew</div>
                </div>
                <div className={styles.castContainer}>
                    <div className={`${styles.arrow}`}>
                        <MdOutlineArrowBackIos/>
                    </div>
                    <div className={styles.cast}>
                        {meta.credits.crew.map(c => (
                            <CastPfpComponent member={c} />
                        ))}
                    </div>
                    <div className={`${styles.arrowRight} ${styles.arrow}`}>
                        <MdOutlineArrowBackIos/>
                    </div>
                </div>
            </div>
        </div>
            
    )

}