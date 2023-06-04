import { useEffect, useState } from "react";
import Notifications, { NotificationInfo } from "../logic/notifications";

export default function useNotification() {
    const [notification, setNotification] = useState<NotificationInfo>(Notifications.get());

    useEffect(() => {
        Notifications.addEventListener(setNotification);

        return () => {
            Notifications.removeEventListener(setNotification);
        }
    });

    return notification;
}