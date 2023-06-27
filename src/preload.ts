// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";
const ALLOWED_EVENTS = ["emojis", "room ID", "chat", "error", "url", "library", "metadata", "websocket state", "buffering", "paused", "timestamp", "avatars", "local media"];


const eventListeners: Map<string, ((data: any) => void)[]> = new Map();


contextBridge.exposeInMainWorld('electronAPI', {
    addEventListener: (event: string, callback: (data: any) => void) => {
        const listeners = eventListeners.get(event);
        if (listeners) {
            listeners.push(callback);
        } else {
            eventListeners.set(event, [callback]);
        }
    },

    removeEventListener: (event: string, callback: (data: any) => void) => {
        const listeners = eventListeners.get(event);
        if (!listeners) return;
        const index = listeners.indexOf(callback);
        if (index < 0) return;
        listeners.splice(index, 1);
    },

    socketSend: (type: string, data?: any) => {
        try {
            ipcRenderer.send("socket", {
                type,
                data
            });
        } catch (e) {
            console.error("error whilst trying to contact electron", e);
        }
    },

    getMetadata: (filename: string, requestId: string) => {
        ipcRenderer.send("get metadata", {
            filename,
            requestId
        });
    }
});

function sendEvent(event: string, data?: any) {
    const listeners = eventListeners.get(event) || [];
    for (let callback of listeners) {
        callback(data);
    }
}

for (let event of ALLOWED_EVENTS) {
    ipcRenderer.on(event, (e, data) => {
        sendEvent(event, data);
    })
}