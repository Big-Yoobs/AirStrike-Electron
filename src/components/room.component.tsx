import { useState } from "react";
import PlayerComponent from "./player.component";
import styles from "../styles/room.compoment.module.scss";
import RoomPopoutButton from "./room-popout-button.component";
import { IoLibrary } from "react-icons/io5";
import { BsFillDoorOpenFill, BsFillNutFill } from "react-icons/bs"
import { FaTheaterMasks } from "react-icons/fa";

export default function RoomComponent() {
    const [view, setView] = useState<"library" | "theatre" | "settings">("theatre");
    const [sidebarOpen, setSidebarOpen] = useState(true);

    function drawView() {
        switch (view) {
            default: return <PlayerComponent src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {drawView()}
            </div>
            <div className={styles.sidebarContainer + (sidebarOpen ? ` ${styles.open}` : "")}>
                <div className={styles.sidebar}>
                    this is a cool sidebar
                </div>
                <div className={styles.popout} onClick={() => setSidebarOpen(!sidebarOpen)}>
                    <RoomPopoutButton selected={view == "library"} onclick={() => setView("library")}>
                        <IoLibrary />
                    </RoomPopoutButton>

                    <RoomPopoutButton selected={view == "theatre"} onclick={() => setView("theatre")}>
                        <FaTheaterMasks />
                    </RoomPopoutButton>

                    <RoomPopoutButton onclick={() => setSidebarOpen(!sidebarOpen)} open={sidebarOpen} />

                    <RoomPopoutButton selected={view == "settings"} onclick={() => setView("settings")}>
                        <BsFillNutFill />
                    </RoomPopoutButton>

                    <RoomPopoutButton>
                        <BsFillDoorOpenFill />
                    </RoomPopoutButton>
                </div>
            </div>
        </div>
    )
}