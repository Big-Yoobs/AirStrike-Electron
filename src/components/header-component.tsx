import styles from '../styles/header.component.module.scss';
import TextInputComponent from './text-input.component';
import AvatarGuiComponent from './avatar-gui.component';

export default function HeaderComponent() {

    return (

        <div className={styles.headerContainer}>

            <img className={styles.logo} src="https://i.imgur.com/8otsuij.png"/>

            <div className={styles.menuItem}>Home</div>
            <div className={styles.menuItem}>Create Room</div>
            <div className={styles.menuItem}>Join Room</div>

            <div className={styles.searchContainer}>
                <TextInputComponent placeholder="Search" />
            </div>

            <div className={styles.menuItem}>About</div>
            <div className={styles.menuItem}>Settings</div>
            <div className={styles.avatarContainer}>
                <AvatarGuiComponent />
            </div>

        </div>
    )

}