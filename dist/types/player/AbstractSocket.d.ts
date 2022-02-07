import { IServerItem } from "../model/IServerItem";
import { ConnectionState } from "./enum/ConnectionState";
export declare class AbstractSocket {
    protected readonly CONNECTION_TIMEOUT: number;
    protected socket: WebSocket;
    protected socketURL: string;
    protected serverData: IServerItem;
    protected serverList: Array<IServerItem>;
    protected connectionState: ConnectionState;
    protected messageCount: number;
    protected messageTotalSize: number;
    protected reconnectTimer: any;
    protected connectionTimeout: any;
    constructor();
    protected startSocket(socketURL: string, isBinary?: boolean): void;
    startConnection(): void;
    protected createSocket(serverData: IServerItem): void;
    protected onSocketOpen(event: any): void;
    protected onSocketClose(event: any): void;
    protected onSocketMessage(event: any): void;
    protected onSocketError(event: any): void;
    protected onAllServersError(): void;
    sendData(data: any): void;
    protected restartConnection(timeOut: number): void;
    getConnectionState(): ConnectionState;
    protected destroy(): void;
    getSocketURL(): string;
    getServerData(): IServerItem;
}
