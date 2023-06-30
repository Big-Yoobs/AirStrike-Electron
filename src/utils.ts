export interface ElectronAPI { // typescript typings for electron methods in preload.ts
    addEventListener: (event: string, callback: (data: any) => void) => void

    removeEventListener: (event: string, callback: (data: any) => void) => void

    socketSend: (type: string, data?: any) => void

    getMetadata: (filename: string, requestId: string) => void
}

export function electron(): ElectronAPI { // shorthand for getting electron api
    return (window as any).electronAPI;
}

export function wait(seconds: number) { // non-blocking wait function
    return new Promise(r => {
        setTimeout(r, seconds * 1000);
    })
}