import { ChatMessage } from "../hooks/use-chat";
import { electron, wait } from "../utils";

export interface EmojiInfo {
    emoji: string
    visible: boolean
    uid: string
}

const emojis: string[] = [];
const activeEmojis: EmojiInfo[] = [];
const eventListeners: ((emojis: EmojiInfo[]) => void)[] = [];

function generateId() {
    const time = (new Date()).getTime().toString();
    let id = time;
    const takenIds = activeEmojis.map(item => item.uid);

    let increment = 0;
    while (takenIds.includes(id)) {
        id = time + " " + ++increment;
    }
    return id;
}

electron().addEventListener("emojis", (newEmojis: string[]) => { // update list of known emojis
    emojis.splice(0, emojis.length, ...newEmojis);
});

electron().addEventListener("chat", async (message: ChatMessage) => { // subscribe to chat message event
    const separated = message.message.split(" ");
    const foundEmojis: string[] = [];
    for (let i = 0; i < separated.length; i++) {
        let word = separated[i];
        if (!word.startsWith("\\") || !word.endsWith("\\") || word.length <= 2) return;

        const emojiName: string = word.substring(1, word.length - 1);
        if (emojis.includes(emojiName)) {
            foundEmojis.push(emojiName);
        }
    }

    for (let emojiName of foundEmojis) {
        const emoji: EmojiInfo = {
            emoji: emojiName,
            visible: true,
            uid: generateId()
        };

        activeEmojis.push(emoji);
        update();
        setTimeout(() => {
            emoji.visible = false;
            update();
            setTimeout(() => {
                activeEmojis.shift();
                update();
            }, 1000);
        }, 800);
        await wait(0.5);
    }
});

function update() {
    for (let callback of eventListeners) {
        callback([...activeEmojis]);
    }
}

export default class EmojiPopups { // expose functions
    static addEventListener(callback: (emojis: EmojiInfo[]) => void) {
        if (eventListeners.includes(callback)) return;
        eventListeners.push(callback);
    }

    static removeEventListener(callback: (emojis: EmojiInfo[]) => void) {
        const index = eventListeners.indexOf(callback);
        if (index < 0) return;
        eventListeners.splice(index, 1);
    }

    static get() {
        return [...activeEmojis];
    }
}