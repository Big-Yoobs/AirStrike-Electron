import HomeComponent from "./components/home.component";
import NotificationComponent from "./components/notification-component";
import RoomComponent from "./components/room.component";
import useRoomId from "./hooks/use-room-id";
import styles from './styles/app.component.module.scss';
import useWebsocketState from "./hooks/use-websocket-state";
import LoadingAnimComponent from "./components/loading-anim.component";
import { useState } from "react";
import ProfileModalComponent from "./components/profile-modal.component";

export default function AppComponent() {
    const [avatarId, setAvatarId] = useState<string | null>(null);
    const roomId = useRoomId();
    const socketState = useWebsocketState();
  
    if (!socketState.connected) {
        return (
            <div className={styles.container}>
                <LoadingAnimComponent title="Connecting to Server" />
            </div>
        )
    }

    if (!avatarId) {
        return (
            <ProfileModalComponent onSave={setAvatarId} />
        )
    }

    return (
        <div className={styles.container}>
            {roomId ? (
                <RoomComponent/>
            ) : (
                <HomeComponent/>
            )}
            <NotificationComponent />            
        </div>
    )
}