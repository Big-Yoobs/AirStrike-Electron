import HomeComponent from "./components/home.component";
import RoomComponent from "./components/room.component";
import RoomModalComponent from "./components/room-modal.component";
import { electron } from "./utils";

electron().addEventListener("room ID", console.log);

export default function AppComponent() {
    return (
        <>
            <HomeComponent />
            {/* <LibraryComponent/> */}
        </>
    )
}