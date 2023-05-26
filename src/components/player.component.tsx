import { useRef, useState } from "react";
import styles from "../styles/player.component.module.scss"
import Slider from "./slider.component";
import { useResizeDetector } from "react-resize-detector";

export default function PlayerComponent() {
    const video = useRef<HTMLVideoElement>();
    const [currentTime, setCurrentTime] = useState(0);
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

    // const currentTime = isNaN(video.current?.duration) ? 0 : video.current.currentTime / video.current.duration;

    return (
        <div>
            <div className={styles.videoContainer}>
                <video ref={video} onTimeUpdate={e => setCurrentTime(e.currentTarget.currentTime / e.currentTarget.duration)} className={styles.video} src="https://dl4006.ymcdn.website/b050f23bdae439efac23a61dea2e5ceb/tBwlULqDmNU?dl=1" autoPlay muted></video>
            </div>
            <div className={styles.dock} ref={dockRef}>
                <button onClick={() => setTime(currentTime - 10 / video.current.duration)}>Rewind</button>
                <button onClick={togglePlay}>{video.current?.paused ? "Play" : "Pause"}</button>
                <button onClick={() => setTime(currentTime + 10 / video.current.duration)}>Skip</button>
                <Slider min={0} max={10_000} value={currentTime * 10_000} onChange={value => setTime(value / 10_000)} length={dockWidth - 40} color="red" />
            </div>
        </div>
    )
}