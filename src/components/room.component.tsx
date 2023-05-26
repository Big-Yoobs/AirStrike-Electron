import { useState } from "react";
import PlayerComponent from "./player.component";
import styles from "../styles/room.compoment.module.scss";

export default function RoomComponent() {
    const [view, setView] = useState<"video" | "library">("video");

    function drawView() {
        switch (view) {
            default: return <PlayerComponent />
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {drawView()}
            </div>
            <div className={styles.sidebar}>

            </div>
        </div>
    )
}