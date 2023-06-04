import { electron } from "../utils";

let timeout: ReturnType<typeof setTimeout>;

export interface NotificationInfo {
    text: string | null;
    status: "normal" | "success" | "danger" | "none"
}

let notificationText: string | null = null;
let notificationStatus: "normal" | "success" | "danger" | "none" = "none";

const eventListeners: ((info: NotificationInfo) => void)[] = [];

export default class Notifications {
    static set(notification: string, status: "normal" | "success" | "danger") {
        let changed = false;

        if (notification != notificationText) {
            changed = true;
            notificationText = notification;
        }

        if (status != notificationStatus) {
            changed = true;
            notificationStatus = status;
        }

        if (changed) {
            for (let callback of eventListeners) {
                callback({
                    text: notificationText,
                    status: notificationStatus
                });
            }

            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(() => {
                notificationText = null;
                notificationStatus = "none";
                for (let callback of eventListeners) {
                    callback({
                        text: null,
                        status: "none"
                    });
                }
            }, 5_000);
        }
    }

    static setError() {
        this.set("Something went wrong!", "danger");
    }

    static get(): NotificationInfo {
        return {
            text: notificationText,
            status: notificationStatus
        }
    }

    static addEventListener(callback: (info: NotificationInfo) => void) {
        if (eventListeners.includes(callback)) return;
        eventListeners.push(callback);
    }

    static removeEventListener(callback: (info: NotificationInfo) => void) {
        const index = eventListeners.indexOf(callback);
        if (index < 0) return;
        eventListeners.splice(index, 1);
    }
}

electron().addEventListener("error", e => {
    Notifications.set(e, "danger");
});