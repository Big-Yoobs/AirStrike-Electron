import styles from '../styles/media-item.component.module.scss';


export default function MediaItemComponent() {

    
    const title : string = "Terminator 2: Judgement Day"
    const coverSrc : string = "https://www.themoviedb.org/t/p/w1280/weVXMD5QBGeQil4HEATZqAkXeEc.jpg"
    const subtitle : string = "";
    const year : number = 1991;
    const director : string = "James Cameron";
    const desc : string = "Nearly 10 years have passed since Sarah Connor was targeted for termination by a cyborg from the future. Now her son, John, the future leader of the resistance, is the target for a newer, more deadly terminator. Once again, the resistance has managed to send a protector back to attempt to save John and his mother Sarah."
    const length : number[] = [2, 17];


    return (
        <div className={styles.container}>
            <div className={styles.primaryContainer}>
                <img className={styles.cover} src={coverSrc} />
                <div className={styles.textContainer}>
                    <div className={styles.title}>{title}</div>
                    <div className={styles.subtitle}>{subtitle}</div>
                </div>
            </div>	
            <div className={styles.secondaryContainer}>
                <div className={styles.secTitle}>{title}</div>
                <div className={styles.secSubtitle}>
                    <div className={styles.year}>Release: <span>{year}</span></div>
                    <div className={styles.director}>Director: <span>{director}</span></div>
                </div>
                <div className={styles.desc}>{desc}</div>
                <div className={styles.length}>{length[0]}h {length[1]}m</div>
            </div>
        </div>

    )
    
}