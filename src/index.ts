import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import * as fs from "fs";
import * as Path from "path";
import BaseWebsocket from "ws";
import { getMovieMetadata } from "./backend/meta";
import Library, { File } from './backend/library';
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const DIRECTORY = Path.resolve("./"); // path to local directory

// handle creating/removing shortcuts on windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    app.quit();
}

let mainWindow: BrowserWindow; // window that the user sees
let socket: Websocket; // connection to the airstrike server
let socketId = -1;

function newSocket() { // create a new connection to the server, old connection will be killed automatically if exists
    console.log("creating new socket!");
    const newSocketId = Date.now();
    socketId = newSocketId;
    if (socket) socket.close();
    socket = new Websocket("wss://socket.airstrike.tv");
    let open = true;
    socket.on("open", () => {
        console.log("websocket open");
        mainWindow.webContents.send("websocket state", {
            connected: true
        });
        const timeout = setInterval(() => {
            if (!open) {
                clearInterval(timeout);
                return;
            }
            socket.ping();
        }, 5_000);
    });
    socket.once("error", e => {
        console.error(e);
    });

    socket.on("close", () => {
        open = false;
        if (newSocketId != socketId) return console.log("cancelling socket!");
        console.log("websocket close");
        mainWindow.webContents.send("websocket state", {
            connected: false
        });
        newSocket();
    });
}

const createWindow = (): void => { // open window
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
            nodeIntegration: true
        },
        autoHideMenuBar: true
    });

    // load index.html
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    mainWindow.maximize();
    
    //input checking
    mainWindow.webContents.on('before-input-event', (event, input) => {
        // fullscreen
        if (input.key === 'F10') {
            event.preventDefault();
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }

        // open devtools
        if (input.key === 'F12') {
            event.preventDefault();
            mainWindow.webContents.toggleDevTools();
        }

        // reload
        if (input.key === 'F5') {
            event.preventDefault();
            mainWindow.reload();
        }
    });

    const libraryListener = (files: File[]) => { // make window subscribe to library updates
        mainWindow.webContents.send("library", files);
    }

    mainWindow.webContents.on('dom-ready', () => { // window is ready
        mainWindow.webContents.send("emojis", Array.from(emojis.keys()));
        mainWindow.webContents.send("avatars", Array.from(avatars.keys()));
        mainWindow.webContents.send("local media", localMedia);
        mainWindow.webContents.send("library", Library.get());
        newSocket(); // connect to server
        Library.addListener(libraryListener);
    });

    mainWindow.webContents.on("destroyed", () => { // window is closed
        console.log("Closing websocket");
        socketId = -1;
        socket.close();
        Library.removeListener(libraryListener);
    });
};

app.on('ready', () => { // electron is ready
    ipcMain.on("socket", (e, data) => { // window sent data to electron to pass to the server
        try {
            socket?.message(data.type, data.data);
        } catch {}
    });

    ipcMain.on("get metadata", async (e, data) => { // window request to get movie metadata
        const meta = await getMovieMetadata(data.filename);
        mainWindow.webContents.send("metadata", {
            filename: data.filename,
            requestId: data.requestId,
            metadata: meta
        });
    });

    createWindow(); // create window now that electron is ready

    protocol.registerFileProtocol("gui", (request, callback) => { // src="gui://logo.png"
        const contentName = request.url.substring(6);
        if (contentName.includes("..") || contentName.includes(":")) return callback(null);

        const path = Path.join(DIRECTORY, "assets", "gui", contentName);
        callback({path});
    });

    protocol.registerFileProtocol("avatar", (request, callback) => { // src="avatar://villainbiden"
        const avatarName = request.url.substring(9);
        const avatar = avatars.get(avatarName);
        if (!avatar) return callback(null);

        const path = Path.join(DIRECTORY, "assets", "avatars", avatar);
        callback({path});
    });

    protocol.registerFileProtocol("emoji", (request, callback) => { // src="emoji://joecool"
        const emojiName = request.url.substring(8);
        const emoji = emojis.get(emojiName);
        if (!emoji) return callback(null);

        const path = Path.join(DIRECTORY, "assets", "emojis", emoji);
        callback({path});
    });

    protocol.registerFileProtocol("content", (request, callback) => { // src="content://joecool.mp4"
        const mediaName = request.url.substring(10);
        if (!localMedia.includes(mediaName)) return callback(null);

        const path = Path.join(DIRECTORY, "content", mediaName);
        callback({path});
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


function makeDir(directory: string) { // create directory if not exists
    if (!fs.existsSync(Path.join(DIRECTORY, directory))) {
        console.log(`making ${directory} directory`);
        fs.mkdirSync(Path.join(DIRECTORY, directory));
    }
}

makeDir("content"); // create content directory

const avatars: Map<string, string> = new Map();
const avatarDir = fs.readdirSync(Path.join(DIRECTORY, "assets", "avatars"));

for (let avatarCategory of avatarDir) { // find all avatars
    if (typeof avatarCategory != "string") continue;
    const avatarCatResults = fs.readdirSync(Path.join("assets", "avatars", avatarCategory));
    for (let avatar of avatarCatResults) {
        if (typeof avatar != "string" || !avatar.includes(".")) continue;
        const extension = Path.extname(avatar).toLowerCase();
        if (!["png", "jpg", "gif"].includes(extension.substring(1))) continue;
        avatars.set(avatar.slice(0, -extension.length), Path.join(avatarCategory, avatar));
    }
}

const emojis: Map<string, string> = new Map();
const emojiDir = fs.readdirSync(Path.join(DIRECTORY, "assets", "emojis"));

for (let emojiCategory of emojiDir) { // find all emojis
    if (typeof emojiCategory != "string") continue;
    const emojiCatResults = fs.readdirSync(Path.join("assets", "emojis", emojiCategory));
    for (let emoji of emojiCatResults) {
        if (typeof emoji != "string" || !emoji.includes(".")) continue;
        const extension = Path.extname(emoji).toLowerCase();
        if (!["png", "jpg", "gif"].includes(extension.substring(1))) continue;
        emojis.set(emoji.slice(0, -extension.length), Path.join(emojiCategory, emoji));
    }
}

const localMedia: string[] = [];
const localMediaDir = fs.readdirSync(Path.join(DIRECTORY, "content"));

for (let media of localMediaDir) { // find all local media
    if (typeof media != "string" || !media.includes(".")) continue;
    const extension = Path.extname(media).toLowerCase();
    if (!["mkv", "mov", "mp4", "webm"].includes(extension.substring(1))) continue;
    localMedia.push(media);
}



class Websocket extends BaseWebsocket { // custom websocket wrapper
    private eventListeners: Map<string, ((message: any) => void)[]> = new Map();

    constructor(url: string) {
        super(url);
        this.on("message", message => {
            try {
                const data = JSON.parse(message.toString());
                console.log(data);
                this.runCallback(data.type, data.data);
            } catch (e) {
                console.error(e);
            }
        });
    }

    runCallback(event: string, data?: any) { // pass native event to event listeners
        mainWindow.webContents.send(event, data);
        const listeners = this.eventListeners.get(event) || [];
        for (let callback of listeners) {
            console.log(callback, event, data);
            callback(data);
        }
    }

    addCallback(event: string, callback: (data: any) => void) { // add event listener
        const listeners = this.eventListeners.get(event);
        if (listeners) {
            listeners.push(callback);
        } else {
            this.eventListeners.set(event, [callback]);
        }
    }

    removeCallback(event: string, callback: (data: any) => void) { // remove event listener
        const listeners = this.eventListeners.get(event);
        if (!listeners) return;
        const index = listeners.indexOf(callback);
        if (index < 0) return;
        listeners.splice(index, 1);
    }

    message(messageType: string, data?: any) { // send message to server
        this.send(JSON.stringify({
            type: messageType,
            data
        }));
    }
}