import styles from '../styles/header.component.module.scss';
import TextInputComponent from './text-input.component';
import AvatarGuiComponent from './avatar-gui.component';
import { electron } from '../utils';
import RoomModalComponent from './room-modal.component';
import { useState } from 'react';

export default function HeaderComponent() {
    const [joinModelOpen, setJoinModalOpen] = useState(false);

    return (
        <>
            <div className={styles.headerContainer}>
                <img className={styles.logo} src="https://i.imgur.com/8otsuij.png"/>

                <div className={styles.menuItem}>Home</div>
                <div className={styles.menuItem} onClick={() => electron().socketSend("create room")}>Create Room</div>
                <div className={styles.menuItem} onClick={() => setJoinModalOpen(true)}>Join Room</div>

                <div className={styles.searchContainer}>
                    <TextInputComponent placeholder="Search" />
                </div>

                <div className={styles.menuItem}>About</div>
                <div className={styles.menuItem}>Settings</div>
                <div className={styles.avatarContainer}>
                    <AvatarGuiComponent />
                </div>
            </div>

            <RoomModalComponent open={joinModelOpen} onClose={() => setJoinModalOpen(false)} />
        </>
    )

}