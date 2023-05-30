import styles from '../styles/media-item.component.module.scss';
import { BsFillCheckCircleFill } from 'react-icons/bs';


export default function MediaItemComponent() {

    
    const title : string = "Terminator 2: Judgement Day"
    const coverSrc : string = "https://www.themoviedb.org/t/p/w1280/weVXMD5QBGeQil4HEATZqAkXeEc.jpg"
    const subtitle : string = "";
    const year : number = 1991;
    const director : string = "James Cameron";
    const desc : string = "Nearly 10 years have passed since Sarah Connor was targeted for termination by a cyborg from the future. Now her son, John, the future leader of the resistance, is the target for a newer, more deadly terminator. Once again, the resistance has managed to send a protector back to attempt to save John and his mother Sarah."
    const length : number[] = [2, 17];
    const watched : boolean = true;


    return (
        <div className={styles.container}>
            <div className={styles.primaryContainer}>
                <img src={coverSrc} />
                <div className={styles.textContainer}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.secondLineContainer}>
                        <div className={styles.year}>{year}</div>
                        <div>{subtitle}</div>
                        {watched ? (
                            <div className={styles.watchedContainer}>
                                <BsFillCheckCircleFill />
                            </div>
                        ) : null}                
                    </div>
                </div>
            </div>	
            <div className={styles.secondaryContainer}>
                <div className={styles.secOverlay}></div>  
                <div className={styles.secText}> 
                    <div className={styles.secTitle}>{title}</div>
                    <div className={styles.secSubtitle}>
                        <div className={styles.year}>Release: <span>{year}</span></div>
                        <div>Director: <span>{director}</span></div>
                    </div>
                    <div className={styles.desc}>{desc}</div>
                    <div className={styles.length}>{length[0]}h {length[1]}m</div>
                </div>                
            </div>
        </div>

    )
    
}