import styles from '../styles/media-item.component.module.scss';


export default function MediaItemComponent() {

    
    const title : string = "Terminator 2: Judgement Day"
    const coverSrc : string = "https://www.themoviedb.org/t/p/w1280/weVXMD5QBGeQil4HEATZqAkXeEc.jpg"
    const subtitle : string = "";

    return (
        <div className={styles.container}>
            <img className={styles.cover} src={coverSrc} />
            <div className={styles.textContainer}>
                <div className={styles.title}>{title}</div>
                <div className={styles.subtitle}>{subtitle}</div>
            </div>
        </div>

    )
    
}