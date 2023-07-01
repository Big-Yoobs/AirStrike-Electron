import { useEffect, useState } from "react";
import Notifications, { NotificationInfo } from "../logic/notifications";

export default function useNotification() { // hook for getting info regarding the current active notification
    const [notification, setNotification] = useState<NotificationInfo>(Notifications.get());

    useEffect(() => {
        Notifications.addEventListener(setNotification);

        return () => {
            Notifications.removeEventListener(setNotification);
        }
    }, []);

    return notification;
}