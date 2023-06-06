import HomeComponent from "./components/home.component";
import NotificationComponent from "./components/notification-component";
import RoomComponent from "./components/room.component";
import useRoomId from "./hooks/use-room-id";
import FilmPageComponent from "./components/film-page.component";
import styles from './styles/app.component.module.scss';

export default function AppComponent() {
    const roomId = useRoomId();

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