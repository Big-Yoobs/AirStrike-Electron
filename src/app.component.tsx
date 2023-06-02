import HomeComponent from "./components/home.component";
import RoomComponent from "./components/room.component";
import useRoomId from "./hooks/use-room-id";

export default function AppComponent() {
    const roomId = useRoomId();

    if (roomId) {
        return <RoomComponent />
    }

    return <HomeComponent />
}