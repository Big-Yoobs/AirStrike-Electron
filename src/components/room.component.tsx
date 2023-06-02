import { useRef, useState } from "react";
import PlayerComponent from "./player.component";
import styles from "../styles/room.compoment.module.scss";
import RoomPopoutButton from "./room-popout-button.component";
import { IoLibrary } from "react-icons/io5";
import { BsFillDoorOpenFill, BsFillNutFill } from "react-icons/bs"
import { FaTheaterMasks } from "react-icons/fa";
import ChatMessageComponent from "./chat-message.component";
import LibraryComponent from "./library.component";

export default function RoomComponent() {
    const [view, setView] = useState<"library" | "theatre" | "settings">("theatre");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [chatMessages, setChatMessages] = useState<string[]>([]);
    const chatInput = useRef<HTMLInputElement>()

    function drawView() {
        switch (view) {
            case "library": return <LibraryComponent />
            default: return <PlayerComponent src="content://chungus.mp4" />
        }
    }

    function chatKeypress(e: React.KeyboardEvent) {
        if (e.key == "Enter") {
            const message = chatInput.current.value;
            chatInput.current.value = "";
            setChatMessages(messages => [...messages, message]);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {drawView()}
            </div>
            <div className={styles.sidebarContainer + (sidebarOpen ? ` ${styles.open}` : "")}>
                <div className={styles.sidebar}>
                    <div className={styles.chat}>
                        <div className={styles.chatFeed}>
                            {chatMessages.map((message, index) => (
                                <ChatMessageComponent text={message} key={index} />
                            ))}
                        </div>
                        <input ref={chatInput} type="text" className={styles.chatbox} placeholder="Say something..." onKeyDown={chatKeypress} />
                    </div>
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