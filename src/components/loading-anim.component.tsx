import styles from '../styles/loading-anim.component.module.scss';

export default function LoadingAnimComponent() {
    return (
        <div className={styles.container}>
            <div className={styles.logoIconContainer}>
                <div className={styles.spinContainer}>
                    <div className={styles.ldsDualRing}></div>
                </div>
                <img src="https://i.imgur.com/DzzTph7.png" /> //replace with logo from assets/gui
            </div>
            
            <div className={styles.loadingText}>AIRSTRIKE</div>
        </div>
    );
}