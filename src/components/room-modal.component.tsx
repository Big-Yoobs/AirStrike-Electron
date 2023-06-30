import { electron } from '../utils';
import styles from '../styles/room-modal.component.module.scss';
import { FaSkullCrossbones } from 'react-icons/fa';
import { useRef } from 'react';
import Notifications from '../logic/notifications';

//Join room modal component which can be activated from the library view by clicking the join room button

export interface RoomModelComponentProps {
    open?: boolean
    onClose?: () => void
}

export default function RoomModalComponent(props: RoomModelComponentProps) {
    const input = useRef<HTMLInputElement>()
    
    if (!props.open) return null;

    function chatKeypress(e: React.KeyboardEvent) {
        if (e.key == "Enter") {
            send();
        }
    }

    function send() {
        const roomID = input.current.value;
        if (!roomID) {
            Notifications.set("Enter a room code.", "normal");
            return;
        }
        electron().socketSend("join room", roomID);
    }

    return (
        <>
            <div className={styles.background} onClick={props.onClose} />
            <div className={styles.joinRoomContainer}>
                {/* title */}
                <div className={styles.joinRoomTitle}>Join Room</div>
                {/* close button */}
                <div className={styles.closeButton} onClick={props.onClose}><FaSkullCrossbones/></div> 

                <div className={styles.inputMainContainer}>
                    <div className={styles.inputLabel}>Room Code</div>
                    {/* input field */}
                    <div className={styles.inputContainer}>
                        <input className={styles.inputField} placeholder="Enter Room Code" ref={input} onKeyDown={chatKeypress} autoFocus />
                        <button className={styles.actionBtn} onClick={send}>Join</button>
                    </div>
                </div>
            </div>
        </>
    )

}