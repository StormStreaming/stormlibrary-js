import { AbstractSocket } from "../player/AbstractSocket";
import { StormLibrary } from "../StormLibrary";
import { IStreamer } from "./IStreamer";
export declare class WebRTCStatusConnection extends AbstractSocket {
    private readonly LOG_ACTIVITY;
    private main;
    private player;
    private logger;
    private interval;
    private isPublished;
    private clearStatus;
    private isDestroyed;
    private lastFPS;
    private publishDelay;
    constructor(main: StormLibrary, player: IStreamer);
    startConnection(): void;
    protected createSocket(): void;
    protected onSocketOpen(event: any): void;
    protected onSocketClose(event: any): void;
    protected onSocketMessage(event: any): void;
    protected onSocketError(event: any): void;
    protected onAllServersError(): void;
    checkIfStreamReady(): void;
    forceDeleteStream(): void;
    destroy(): void;
}
