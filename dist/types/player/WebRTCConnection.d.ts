import { AbstractSocket } from "./AbstractSocket";
import { StormLibrary } from "../StormLibrary";
import { IWebRTC } from "./IWebRTC";
export declare class WebRTCConnection extends AbstractSocket {
    private readonly LOG_ACTIVITY;
    private main;
    private player;
    private logger;
    constructor(main: StormLibrary, player: IWebRTC);
    startConnection(): void;
    protected createSocket(): void;
    protected onSocketOpen(event: any): void;
    protected onSocketClose(event: any): void;
    protected onSocketMessage(event: any): void;
    protected onSocketError(event: any): void;
    protected onAllServersError(): void;
    destroy(): void;
}
