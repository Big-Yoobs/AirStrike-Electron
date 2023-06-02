import styles from '../styles/room-modal.component.module.scss';
import { FaSkullCrossbones } from 'react-icons/fa';


export interface RoomModalComponentProps {
    isJoinRoom: boolean;
}

export default function RoomModalComponent() {

    return (

        <div className={styles.joinRoomContainer}>
            
            <div className={styles.joinRoomTitle}>Join Room</div>
            <div className={styles.closeButton}><FaSkullCrossbones/></div> 

            <div className={styles.inputMainContainer}>
                <div className={styles.inputLabel}>Room Code</div>
                <div className={styles.inputContainer}>
                    <input className={styles.inputField} placeholder="Enter Room Code" />
                    <button className={styles.actionBtn}>Join</button>
                </div>
            </div>


        </div>

    )

}