import { useEffect, useRef, useState } from "react";
import styles from "../styles/player.component.module.scss"
import Slider from "./slider.component";
import { useResizeDetector } from "react-resize-detector";
import { BsPauseFill, BsPlayFill, BsFastForwardFill, BsRewindFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import EmojiPopupComponent from "./emoji-popup.component";
import useEmojiPopups from "../hooks/use-emoji-popups";

export interface PlayerComponentProps {
    src: string
}

export default function PlayerComponent(props: PlayerComponentProps) {
    const video = useRef<HTMLVideoElement>();
    const [currentTime, setCurrentTime] = useState(0);
    const [isBuffering, setIsBuffering] = useState(true);
    const {width: dockWidth, height: dockHeight, ref: dockRef} = useResizeDetector();
    const emojiPopups = useEmojiPopups();

    function setTime(time: number) {
        video.current.currentTime = time * video.current.duration;
    }

    function togglePlay() {
        const v = video.current;
        if (!v) return;
        if (v.paused) {
            v.play();
        } else {
            v.pause();
        }
    }

    useEffect(() => {
        video.current.onload = console.log;
        video.current.onerror = console.error;
        video.current.oncanplay = () => setIsBuffering(false);
        video.current.load();
    }, [props.src]);

    function videoLoaded() {
        setIsBuffering(false);
        console.log("stopped buffering");
    }

    function setCurrentTimeInternal(time: number) {
        if (!isNaN(time)) {
            setCurrentTime(time);
        }
    }

    return (
        <div>
            <div className={styles.videoContainer}>
                <video ref={video} onLoad={videoLoaded} onError={console.error} onTimeUpdate={e => setCurrentTimeInternal(e.currentTarget.currentTime / e.currentTarget.duration)} className={styles.video} src={props.src}></video>
            </div>
            {emojiPopups.map(emoji => (
                <EmojiPopupComponent emoji={emoji.emoji} key={emoji.uid} visible={emoji.visible} />
            ))}
            {!isNaN(video.current?.currentTime) && !isNaN(video.current?.duration) && (
                <div className={styles.dock} ref={dockRef}>
                    <div className={styles.dockButtons}>
                        <IconContext.Provider value={{size: "40px"}}>
                            <button onClick={() => setTime(currentTime - 10 / video.current.duration)}>
                                <BsRewindFill />
                            </button>
                            <IconContext.Provider value={{size: "50px"}}>
                                <button onClick={togglePlay}>{video.current?.paused ? (
                                    <BsPlayFill />
                                ) : (
                                    <BsPauseFill />
                                )}</button>
                            </IconContext.Provider>
                            <button onClick={() => setTime(currentTime + 10 / video.current.duration)}>
                                <BsFastForwardFill />
                            </button>
                        </IconContext.Provider>
                    </div>
                    <Slider min={0} max={10_000} value={currentTime * 10_000} onChange={value => setTime(value / 10_000)} length={dockWidth - 40} color="#430082" />
                </div>
            )}
        </div>
    )
}