import { useEffect, useRef, useState } from "react";
import styles from "../styles/player.component.module.scss"
import Slider from "./slider.component";
import { useResizeDetector } from "react-resize-detector";

export interface PlayerComponentProps {
    src: string
}

export default function PlayerComponent(props: PlayerComponentProps) {
    const video = useRef<HTMLVideoElement>();
    const [currentTime, setCurrentTime] = useState(0);
    const [isBuffering, setIsBuffering] = useState(true);
    const {width: dockWidth, height: dockHeight, ref: dockRef} = useResizeDetector();

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
        console.log("here!");
        video.current.onload = console.log;
        video.current.onerror = console.error;
        video.current.oncanplay = () => setIsBuffering(false);
        video.current.load();
    }, [props.src]);

    function videoLoaded() {
        setIsBuffering(false);
        console.log("stopped buffering");
    }

    return (
        <div>
            <div className={styles.videoContainer}>
                <video ref={video} onLoad={videoLoaded} onError={console.error} onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime / e.currentTarget.duration)} className={styles.video} src={props.src}></video>
            </div>
            {!isNaN(video.current?.currentTime) && !isNaN(video.current?.duration) && (
                <div className={styles.dock} ref={dockRef}>
                    <div className={styles.dockButtons}>
                        <button onClick={() => setTime(currentTime - 10 / video.current.duration)}>Rewind</button>
                        <button onClick={togglePlay}>{video.current?.paused ? "Play" : "Pause"}</button>
                        <button onClick={() => setTime(currentTime + 10 / video.current.duration)}>Skip</button>
                    </div>
                    <Slider min={0} max={10_000} value={currentTime * 10_000} onChange={value => setTime(value / 10_000)} length={dockWidth - 40} color="red" />
                </div>
            )}
        </div>
    )
}