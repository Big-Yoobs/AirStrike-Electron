import styles from '../styles/loading-anim.component.module.scss';

export interface LoadingAnimComponentProps {
    title?: string
}

export default function LoadingAnimComponent({ title }: LoadingAnimComponentProps) {
    return (
        <div className={styles.container}>
            <div className={styles.logoIconContainer}>
                <div className={styles.spinContainer}>
                    <div className={styles.ldsDualRing}></div>
                </div>
                <img src="https://i.imgur.com/DzzTph7.png" />
            </div>
            
            <div className={styles.loadingText}>{title || "AirStrike"}</div>
        </div>
    );
}