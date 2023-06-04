import { useEffect, useState } from "react";
import useNotification from "../hooks/use-notification";
import styles from "../styles/notification.component.module.scss";

export default function NotificationComponent() {
    const [lastText, setLastText] = useState("");
    const info = useNotification();

    useEffect(() => {
        if (info.text !== null) {
            setLastText(info.text);
            return;
        }
        let active = true;

        setTimeout(() => {
            if (!active) return;
            setLastText("");
        }, 200);

        return () => {
            active = false;
        }
    }, [info.text]);

    return (
        <div className={styles.container + " " + styles[info.status]} onClick={e => e.stopPropagation()}>
            <span className={styles.text}>{lastText}</span>
        </div>
    )
}