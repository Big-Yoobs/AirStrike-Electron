import { electron } from '../utils';
import styles from '../styles/profile-modal.component.module.scss';
import AvatarGuiComponent from "./avatar-gui.component";
import { useEffect, useState } from 'react';
import LoadingAnimComponent from './loading-anim.component';

const avatars: string[] = [];

electron().addEventListener("avatars", (newAvatars: string[]) => {
    avatars.splice(0, avatars.length, ...newAvatars);
});

function getRandom(): string | null {
    return avatars[Math.floor(Math.random() * avatars.length)] || null;
}


export interface ProfileModalComponentProps {
    onSave: (avatar: string) => void
}

export default function ProfileModalComponent(props: ProfileModalComponentProps) {
    const [activeId, setActiveId] = useState<string | null>(getRandom());

    useEffect(() => {
        const listener = () => {
            setTimeout(() => {
                if (avatars.length && !activeId) {
                    setActiveId(getRandom());
                }
            });
        }

        electron().addEventListener("avatars", listener);

        return () => {
            electron().removeEventListener("avatars", listener);
        }
    }, [activeId]);

    if (!activeId) {
        return <LoadingAnimComponent title="Loading avatars" />
    }

    function save() {
        if (props.onSave) {
            props.onSave(activeId);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerTitle}>Avatar Selection</div>
                {/* <div className={styles.closeBtn}><FaSkullCrossbones/></div> */}
            </div>
            <div className={styles.currentPfp}>
                <AvatarGuiComponent avatar={activeId} />
            </div>

            {/* <div className={styles.pfpTabs}>
                <div className={styles.pfpTab}>All</div>
                <div className={styles.pfpTab}>General</div>
                <div className={styles.pfpTab}>Waifu</div>
                <div className={styles.pfpTab}>POH</div>
                <div className={styles.pfpTab}>Villains</div>
                <div className={styles.pfpTab}>Floyds</div>
            </div> */}

            <div className={styles.pfpOptions}>
                {avatars.map((avatar, index) => (
                    <button key={index} onClick={() => setActiveId(avatar)} className={styles.option}>
                        <AvatarGuiComponent avatar={avatar} />
                    </button>
                ))}
            </div>

            <div className={styles.footer}>
                <button className="button"onClick={save}>Save</button>
            </div>
        </div>


    )
}