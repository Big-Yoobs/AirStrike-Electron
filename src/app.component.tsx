import HeaderComponent from "./components/header-component";
import RoomComponent from "./components/room.component";
import { electron } from "./utils";

electron().addEventListener("room ID", console.log);

export default function AppComponent() {
    return (
        <>
            <HeaderComponent />
            {/* <RoomComponent /> */}
            <LibraryComponent/>
        </>
    )
}