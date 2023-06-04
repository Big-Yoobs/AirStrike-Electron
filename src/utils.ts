export interface ElectronAPI {
    addEventListener: (event: string, callback: (data: any) => void) => void

    removeEventListener: (event: string, callback: (data: any) => void) => void

    socketSend: (type: string, data?: any) => void
}

export function electron(): ElectronAPI {
    return (window as any).electronAPI;
}