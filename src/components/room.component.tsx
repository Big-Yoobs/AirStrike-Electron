import { useEffect, useRef, useState } from "react";
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
import EmojiSelectionComponent from "./emoji-selection.component";
import useRoomUrl from "../hooks/use-room-url";

export default function RoomComponent() {
    const [view, setView] = useState<"library" | "theatre" | "settings">("theatre");
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const chatMessages = useChat();
    const chatInput = useRef<HTMLInputElement>();
    const chatContainer = useRef<HTMLDivElement>();
    const roomCode = useRoomId();
    const [autoComplete, setAutoComplete] = useState<string | null>(null);
    const [suggestedEmoji, setSuggestedEmoji] = useState<string | null>(null);
    const url = useRoomUrl();

    useEffect(() => {
        console.log("chat changed");
        chatContainer.current.parentElement.scrollTo({
            top: chatContainer.current.clientHeight,
            behavior: "smooth"
        });
    }, [chatMessages]);

    useEffect(() => {
        if (url) {
            console.log("URL changed to:", url);
            setView("theatre");
        }
    }, [url]);

    function drawView() {
        switch (view) {
            case "library": return <LibraryComponent extraMargin />
            default: return <PlayerComponent src={url} />
        }
    }

    function chatKeypress(e: React.KeyboardEvent) {
        if (e.key == "Enter") {
            if (autoComplete && suggestedEmoji) {
                selectEmoji(suggestedEmoji);
                setAutoComplete(null);
                return;
            } else {
                const message = chatInput.current.value;
                chatInput.current.value = "";
                electron().socketSend("chat", message.trim());
                setSuggestedEmoji(null);
                setAutoComplete(null);
            }
        } else if (e.key == "Tab") {
            e.preventDefault();
            if (autoComplete && suggestedEmoji) {
                selectEmoji(suggestedEmoji);
                setAutoComplete(null);
            }
        } else if (e.key == "Escape") {
            setAutoComplete(null);
        } else {
            setTimeout(() => {
                if (chatInput.current.value) {
                    let word = chatInput.current.value.split(" ").pop();
                    if (!word || !word.startsWith("\\")) return setAutoComplete("");
                    setAutoComplete(word);
                } else {
                    setAutoComplete(null);
                }
            });
        }
    }

    function selectEmoji(emoji: string) {
        const words = chatInput.current.value.split(" ");
        if (words.length) {
            const lastWord = words[words.length - 1];
            if (lastWord) words.pop();
        }
        if (words.length) {
            chatInput.current.value = words.join(" ") + ` \\${emoji}\\ `;
        } else {
            chatInput.current.value = `\\${emoji}\\ `;
        }
        
        chatInput.current.focus();
        setAutoComplete(null);
    }

    const shouldShowEmojis = chatInput.current?.value.split(" ").pop()?.startsWith("\\") && autoComplete;

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
                            <div className={styles.chatMessages} ref={chatContainer}>
                                {chatMessages.map((message, index) => (
                                    <ChatMessageComponent message={message} key={index} />
                                ))}
                            </div>
                        </div>
                        <div className={styles.chatInput}>
                            <input ref={chatInput} type="text" className={styles.chatBox} placeholder="Say something..." onKeyDown={chatKeypress} />
                            <div className={styles.emojiSelector}>
                                {shouldShowEmojis && (
                                    <EmojiSelectionComponent autoComplete={autoComplete} onSelect={selectEmoji} onSuggestionChange={setSuggestedEmoji} />
                                )}
                            </div>
                        </div>
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