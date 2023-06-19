import { useEffect, useRef, useState } from "react";
import styles from "../styles/player.component.module.scss"
import Slider from "./slider.component";
import { useResizeDetector } from "react-resize-detector";
import { BsPauseFill, BsPlayFill, BsFastForwardFill, BsRewindFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import EmojiPopupComponent from "./emoji-popup.component";
import useEmojiPopups from "../hooks/use-emoji-popups";
import { electron } from "../utils";
import useBuffering from "../hooks/use-buffering";
import LoadingAnimComponent from "./loading-anim.component";
import useTimestamp from "../hooks/use-timestamp";
import usePaused from "../hooks/use-paused";

export interface PlayerComponentProps {
    src: string | null
}

export default function PlayerComponent(props: PlayerComponentProps) {
    const video = useRef<HTMLVideoElement>();
    const [isBuffering, setIsBuffering] = useState(true);
    const {width: dockWidth, height: dockHeight, ref: dockRef} = useResizeDetector();
    const emojiPopups = useEmojiPopups();
    const roomBuffering = useBuffering();
    const targetTimestamp = useTimestamp();
    const roomPaused = usePaused();
    const [sliderActive, setSliderActive] = useState(false);

    useEffect(() => {
        const difference = Math.abs(targetTimestamp - video.current.currentTime);
        if (difference > 1) { // allow 1 second offset
            video.current.currentTime = targetTimestamp;
        }
    }, [targetTimestamp]);

    function togglePlay() {
        electron().socketSend("paused", !roomPaused);
    }

    useEffect(() => {
        video.current.onload = console.log;
        video.current.onerror = console.error;
        video.current.oncanplay = () => setIsBuffering(false);
        setIsBuffering(true);
        video.current.load();
    }, [props.src]);

    useEffect(() => {
        electron().socketSend("buffering", isBuffering);
    }, [isBuffering]);

    function sliderSetTime(time: number) {
        const newTime = time * video.current.duration;
        electron().socketSend("timestamp", newTime);
    }

    function videoSetTime(time: number) {
        if (sliderActive) return;
        electron().socketSend("timestamp", time);
    }

    let timeDecimal = 0;
    if (video.current?.duration) {
        timeDecimal = targetTimestamp / video.current.duration;
    }

    const videoElementReady = !isNaN(video.current?.currentTime) && !isNaN(video.current?.duration);

    useEffect(() => {
        if (!videoElementReady) return;
        try {
            if (roomBuffering || roomPaused) {
                video.current.pause();
            } else {
                video.current.play();
            }
        } catch (e) {
            console.error(e);
        }
    }, [roomBuffering, video.current, roomPaused, videoElementReady]);

    return (
        <div>
            <div className={styles.videoContainer}>
                <video controls ref={video} onWaiting={() => setIsBuffering(true)} onLoad={() => setIsBuffering(false)} onLoadStart={() => setIsBuffering(true)} onPlaying={() => setIsBuffering(false)} onError={console.error} onTimeUpdate={e => videoSetTime(e.currentTarget.currentTime)} className={styles.video} src={props.src}></video>
                {(roomBuffering || !videoElementReady) && (
                    <LoadingAnimComponent title={props.src ? "Buffering" : "Select a Video"} />
                )}
            </div>
            {emojiPopups.map(emoji => (
                <EmojiPopupComponent emoji={emoji.emoji} key={emoji.uid} visible={emoji.visible} />
            ))}
            {videoElementReady && (
                <div className={styles.dock} ref={dockRef}>
                    <div className={styles.dockButtons}>
                        <IconContext.Provider value={{size: "40px"}}>
                            <button>
                                <BsRewindFill />
                            </button>
                            <IconContext.Provider value={{size: "50px"}}>
                                <button onClick={togglePlay}>{roomPaused ? (
                                    <BsPlayFill />
                                ) : (
                                    <BsPauseFill />
                                )}</button>
                            </IconContext.Provider>
                            <button>
                                <BsFastForwardFill />
                            </button>
                        </IconContext.Provider>
                    </div>
                    <Slider min={0} max={10_000} activeCallback={setSliderActive} value={timeDecimal * 10_000} onChange={value => sliderSetTime(value / 10_000)} length={dockWidth - 40} color="#430082" />
                </div>
            )}
        </div>
    )
}