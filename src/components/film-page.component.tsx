import styles from '../styles/film-page.component.module.scss';
import {BsPlayFill} from 'react-icons/bs';
import {FaUserFriends} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import useMediaMeta from '../hooks/use-media-meta';
import { MovieCrewMember } from '../backend/meta';

export default function FilmPageComponent() {
    const meta = useMediaMeta("terminator 2.mp4");

    const title : string = "Terminator 2: Judgement Day"
    const coverSrc : string = "https://www.themoviedb.org/t/p/w1280/weVXMD5QBGeQil4HEATZqAkXeEc.jpg"
    const bgSrc : string = "https://www.themoviedb.org/t/p/original/xKb6mtdfI5Qsggc44Hr9CCUDvaj.jpg"
    //const director : MovieCrewMember = meta.credits.crewList.crew.find(member => member.job === 'Director');
    console.log(meta.credits.id);
    const length : number[] = [2, 17];
    const watched : boolean = true;

    if (meta === null) {
        return <h1>Failed to load</h1>
    }

    if (!meta) {
        return <h1>Loading...</h1>
    }


    return (

        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.bgImg}>
                    <img src={bgSrc}/>
                    <div className={styles.bgImgOverlay}></div>
                    <div className = {styles.coverContainer}>
                        <img src={coverSrc}/>
                    </div>
                </div>
                <div className={styles.txtHeader}>
                    <div className={styles.title}>{meta.details.title}</div>
                    <div className={styles.txtHeaderSecLine}>
                        <div className={styles.director}>{director}</div>
                        <div className={styles.release}>{meta.details.release_date}</div>
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
                        {meta.details.overview}
                    </div>
                </div>
            </div>

        </div>
    )

}