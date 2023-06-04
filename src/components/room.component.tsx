import { useRef, useState } from "react";
import PlayerComponent from "./player.component";
import styles from "../styles/room.compoment.module.scss";
import RoomPopoutButton from "./room-popout-button.component";
import { IoLibrary } from "react-icons/io5";
import { BsFillDoorOpenFill, BsFillNutFill } from "react-icons/bs"
import { FaTheaterMasks } from "react-icons/fa";
import ChatMessageComponent from "./chat-message.component";
import LibraryComponent from "./library.component";
import { electron } from "../utils";
import useChat from "../hooks/use-chat";
import useRoomId from "../hooks/use-room-id";

export default function RoomComponent() {
    const [view, setView] = useState<"library" | "theatre" | "settings">("theatre");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const chatMessages = useChat();
    const chatInput = useRef<HTMLInputElement>();
    const roomCode = useRoomId();

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
            electron().socketSend("chat", message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {drawView()}
            </div>
            <div className={styles.sidebarContainer + (sidebarOpen ? ` ${styles.open}` : "")}>
                <div className={styles.sidebar}>
                    <div className={styles.sidebarTop}>
                        <div className={styles.roomCode}>
                            <h4>Room Code</h4>
                            <h2>{roomCode}</h2>
                        </div>
                    </div>
                    <div className={styles.chat}>
                        <div className={styles.chatFeed}>
                            <div className={styles.chatMessages}>
                                {chatMessages.map((message, index) => (
                                    <ChatMessageComponent text={message} key={index} />
                                ))}
                            </div>
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

                    <RoomPopoutButton onclick={() => electron().socketSend("leave")}>
                        <BsFillDoorOpenFill />
                    </RoomPopoutButton>
                </div>
            </div>
        </div>
    )
}