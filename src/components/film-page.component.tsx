import styles from '../styles/film-page.component.module.scss';
import {BsPlayFill} from 'react-icons/bs';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import useMediaMeta from '../hooks/use-media-meta';
import ImageWrapperComponent from './image-wrapper.component';
import {MdOutlineArrowBackIos} from 'react-icons/md';
import { MovieCrewMember } from '../backend/meta';
import CastPfpComponent from './cast-pfp.component';
import LoadingAnimComponent from './loading-anim.component';
import useRoomId from '../hooks/use-room-id';
import { electron } from '../utils';
import ScrollComponent from './scroll.component';

// The film page for each film in the library

export interface FilmPageComponentProps {
    filename: string
    onBack?: () => void
}

export default function FilmPageComponent({ filename, onBack } : FilmPageComponentProps) {
    const meta = useMediaMeta(filename);
    const roomId = useRoomId();

    if (meta === null) { //failed to load
        return <h1>Failed to load</h1>
    }

    if (!meta) { //loading animation whilst no metadata exists for media item
        return <LoadingAnimComponent title={filename} />
    }

    const title : string = meta.details.title;
    const coverSrc : string = "https://image.tmdb.org/t/p/w500/" + meta.details.poster_path;
    const bgSrc : string = "https://image.tmdb.org/t/p/original/" + meta.details.backdrop_path;
    const fileContainer : string = meta.filename.split(".").pop()!; //file extension
    
    const release = new Date(meta.details.release_date).toLocaleDateString("en-NZ", {year: "numeric", month: "long", day: "numeric"}); //release year from release date

    //getting the directors and writers from the crew array from the metadata
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
    const runtime : number = meta.details.runtime; //runtime in minutes
    const length : number[] = [Math.floor(runtime / 60), runtime % 60]; //runtime in hours and minutes 
    const watched : boolean = true;
    const userScore : number = Math.round(meta.details.vote_average * 10); //user score out of 100%
    
    //user score title based on the user score
    const scoreThresholds: { [key: number]: string } = {
        0: "Very Bad",
        20: "Bad",
        40: "Average",
        60: "Good",
        80: "Very Good",
        90: "Excellent"
    };
    let userScoreTitle: string;
    //setting the user score title based on the user score  
    for (const threshold in scoreThresholds) {
        if (userScore >= Number(threshold)) {
            userScoreTitle = scoreThresholds[threshold];
        }
    }

    //play button functionality
    function play() {
        if (roomId) { //if currently in a room, use that room
            electron().socketSend("url", "https://assets.airstrike.tv/" + filename);
        } else { //if not in a room, create a new room
            electron().socketSend("create room", "https://assets.airstrike.tv/" + filename);
        }
    }

    return (
        <div className={styles.container}>
            <div>
                {/* Background header image */}
                <div className={styles.bgImg}>
                    {/* back button which sits inside the header image */}
                    <button className={styles.backBtn} onClick={onBack}>
                        <MdOutlineArrowBackIos />
                    </button>

                    <ImageWrapperComponent src={bgSrc} />
                    
                    {/* overlay to darken bg header image */}
                    <div className={styles.bgImgOverlay}></div>
                    <div className = {styles.coverContainer}>
                        <ImageWrapperComponent src={coverSrc}/>
                    </div>
                </div>

                {/* movie title */}
                <div className={styles.txtHeader}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.txtHeaderSecLine}>

                        {/* various metadata */}
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

                {/* buttons */}
                <div className={styles.btnsContainer}>

                    {/* play */}
                    <div className={styles.btn} onClick={play}>
                        <div className={styles.btnIcon}>
                            <BsPlayFill/>
                        </div>
                        <div className={styles.btnText}>Play</div>
                    </div>

                    {/* Edit button (edit with custom metadata) */}
                    {/* <div className={`${styles.btn} ${styles.editBtn}`}>
                        <div className={styles.btnIcon}>
                            <AiFillEdit/>
                        </div>
                    </div> */}

                    {/* add tick if watched before */}
                    {watched ? (
                            <div className={styles.watchedContainer}>
                                <BsFillCheckCircleFill />
                            </div>
                        ) : null
                    }                                        
                </div>
                    
            </div>
            
            {/* description and further metadata details */}
            <div className={styles.descdeets}>

                {/* movie description / about */}
                <div className={styles.description}>
                    <div className={styles.bodyTitle}>Description</div>
                    <div>{desc}</div>
                </div>

                {/* further metadata details */}
                <div className={styles.details}>
                    <div className={styles.bodyTitle}>Details</div>
                    <div>
                        <span className={styles.tag}>Container: </span>
                        <span>{fileContainer.toUpperCase()}</span>
                    </div>
                </div>
            </div>

            {/*Cast scroller  */}
            <ScrollComponent title="Cast">
                {meta.credits.cast.map((c, index) => (
                    <CastPfpComponent member={c} key={index} />
                ))}
            </ScrollComponent>

            {/* Reviews scroller */}
            {/* <ScrollComponent title="Reviews">
            </ScrollComponent> */}

            {/* Related Films scroller */}
            {/*<ScrollComponent title="Related Films">
            </ScrollComponent> */}

            {/* Crew scroller */}
            <ScrollComponent title="Crew">
                {meta.credits.crew.map((c, index) => (
                    <CastPfpComponent member={c} key={index} />
                ))}
            </ScrollComponent>
        </div>
            
    )

}