import { electron } from '../utils';
import styles from '../styles/profile-modal.component.module.scss';
import AvatarGuiComponent from "./avatar-gui.component";
import { FaSkullCrossbones } from 'react-icons/fa';

const avatars: string[] = [];

electron().addEventListener("avatars", (newAvatars: string[]) => {
    console.log("Avatars:", newAvatars);
    avatars.splice(0, avatars.length, ...newAvatars);
});

export default function ProfileModalComponent() {

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerTitle}>Avatar Selection</div>
                <div className={styles.closeBtn}><FaSkullCrossbones/></div>
            </div>
            <div className={styles.currentPfp}>
                <AvatarGuiComponent avatar="villainbiden" />
            </div>

            <div className={styles.pfpTabs}>
                <div className={styles.pfpTab}>All</div>
                <div className={styles.pfpTab}>General</div>
                <div className={styles.pfpTab}>Waifu</div>
                <div className={styles.pfpTab}>POH</div>
                <div className={styles.pfpTab}>Villains</div>
                <div className={styles.pfpTab}>Floyds</div>
            </div>

            <div className={styles.pfpOptions}>
                {avatars.map((avatar, index) => (
                    <AvatarGuiComponent key={index} avatar={avatar} />
                ))}
            </div>

            <div className={styles.footer}>
                <button className="button">Close</button>
            </div>
        </div>


    )
}