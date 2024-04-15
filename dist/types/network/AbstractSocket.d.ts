import { ConnectionState } from "../player/enum/ConnectionState";
import { Logger } from "../logger/Logger";
export declare class AbstractSocket {
    protected readonly CONNECTION_TIMEOUT: number;
    protected logger: Logger;
    protected socket: WebSocket;
    protected socketURL: string;
    protected isBinary: boolean;
    protected connectionState: ConnectionState;
    protected messageCount: number;
    protected connectionTimeout: any;
    protected disconnectedByUser: boolean;
    protected isConnected: boolean;
    startConnection(): void;
    protected onSocketOpen(event: Event): void;
    protected onSocketClose(event: CloseEvent): void;
    protected onSocketMessage(event: MessageEvent): void;
    protected onSocketError(event: Event): void;
    protected onError(error: string): void;
    sendData(data: any): void;
    getConnectionState(): ConnectionState;
    disconnect(): void;
    protected destroy(): void;
    getSocketURL(): string;
}
