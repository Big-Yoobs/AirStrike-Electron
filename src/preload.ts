// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

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
    }
});

function sendEvent(event: string, data: any) {
    const listeners = eventListeners.get(event) || [];
    for (let callback of listeners) {
        callback(data);
    }
}

ipcRenderer.on("emojis", (e, data) => {
    sendEvent("emojis", data);
});

ipcRenderer.on("room ID", (e, data) => {
    sendEvent("room ID", data);
});