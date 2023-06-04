import HomeComponent from "./components/home.component";
import NotificationComponent from "./components/notification-component";
import RoomComponent from "./components/room.component";
import useRoomId from "./hooks/use-room-id";

export default function AppComponent() {
    const roomId = useRoomId();

    return (
        <>
            {roomId ? (
                <RoomComponent />
            ) : (
                <HomeComponent />
            )}
            <NotificationComponent />
        </>
    )
}