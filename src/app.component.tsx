import HomeComponent from "./components/home.component";
import NotificationComponent from "./components/notification-component";
import RoomComponent from "./components/room.component";
import useRoomId from "./hooks/use-room-id";
import styles from './styles/app.component.module.scss';
import useWebsocketState from "./hooks/use-websocket-state";
import LoadingAnimComponent from "./components/loading-anim.component";
import { useEffect, useState } from "react";
import ProfileModalComponent from "./components/profile-modal.component";
import { electron } from "./utils";

export default function AppComponent() { // main react component
    const [avatarId, setAvatarId] = useState<string | null>(null);
    const roomId = useRoomId();
    const socketState = useWebsocketState();

    useEffect(() => {
        if (avatarId) {
            electron().socketSend("avatar", avatarId);
        }
    }, [avatarId]);
  
    if (!socketState.connected) { // not connected to server
        return (
            <div className={styles.container}>
                <LoadingAnimComponent title="Connecting to Server" />
            </div>
        )
    }

    if (!avatarId) { // avatar not set
        return (
            <ProfileModalComponent onSave={setAvatarId} />
        )
    }

    return ( // main app
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