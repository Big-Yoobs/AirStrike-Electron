import styles from '../styles/film-page.component.module.scss';
import {BsPlayFill} from 'react-icons/bs';
import {FaUserFriends} from 'react-icons/fa';
import {AiFillEdit} from 'react-icons/ai';
import {BsFillCheckCircleFill} from 'react-icons/bs';
import useMediaMeta from '../hooks/use-media-meta';

export default function FilmPageComponent() {
    const meta = useMediaMeta("terminator 2.mp4");

    const title : string = "Terminator 2: Judgement Day"
    const coverSrc : string = "https://www.themoviedb.org/t/p/w1280/weVXMD5QBGeQil4HEATZqAkXeEc.jpg"
    const bgSrc : string = "https://www.themoviedb.org/t/p/original/xKb6mtdfI5Qsggc44Hr9CCUDvaj.jpg"
    const year : number = 1991;
    const director : string = "James Cameron";
    const desc : string = "Nearly 10 years have passed since Sarah Connor was targeted for termination by a cyborg from the future. Now her son, John, the future leader of the resistance, is the target for a newer, more deadly terminator. Once again, the resistance has managed to send a protector back to attempt to save John and his mother Sarah."
    const length : number[] = [2, 17];
    const watched : boolean = true;


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
                <div className={styles.title}>{title}</div>

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec euismod, nisl sed aliquam ultricies, nunc sapien
                        tincidunt odio, quis aliquam nunc nisl vitae nunc. Donec
                        euismod, nisl sed aliquam ultricies, nunc sapien tincidunt
                        odio, quis aliquam nunc nisl vitae nunc. Donec euismod, nisl
                        sed aliquam ultricies, nunc sapien tincidunt odio, quis
                        aliquam nunc nisl vitae nunc. Donec euismod, nisl sed
                        aliquam ultricies, nunc sapien tincidunt odio, quis aliquam
                        nunc nisl vitae nunc. Donec euismod, nisl sed aliquam
                        ultricies, nunc sapien tincidunt odio, quis aliquam nunc
                    </div>
                </div>
            </div>

        </div>
    )

}