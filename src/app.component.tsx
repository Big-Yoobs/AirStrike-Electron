import HeaderComponent from "./components/header-component";
import LibraryComponent from "./components/library.component";
import RoomComponent from "./components/room.component";
import RoomModalComponent from "./components/room-modal.component";
import { electron } from "./utils";

electron().addEventListener("room ID", console.log);

export default function AppComponent() {
    return (
        <>
            <HeaderComponent />
            <RoomModalComponent/>
            {/* <RoomComponent /> */}
            <LibraryComponent/>
        </>
    )
}