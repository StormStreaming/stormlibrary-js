import { AbstractSocket } from "./AbstractSocket";
import { StormLibrary } from "../StormLibrary";
import { HLSPlayer } from "./HLSPlayer";
import { RTMPSourceItem } from "../model/RTMPSourceItem";
import { IServerItem } from "../model/IServerItem";
import { StormSourceItem } from "../model/StormSourceItem";
export declare class HLSConnection extends AbstractSocket {
    private readonly LOG_ACTIVITY;
    private main;
    private player;
    private logger;
    private videoSource;
    private pingTimer;
    private seekStart;
    constructor(main: StormLibrary, player: HLSPlayer);
    protected createSocket(serverData: IServerItem): void;
    startHLSConnection(videoSource: RTMPSourceItem | StormSourceItem): void;
    protected onSocketOpen(event: any): void;
    protected onSocketClose(event: any): void;
    protected onSocketMessage(event: any): void;
    protected onSocketError(event: any): void;
    protected onAllServersError(): void;
    destroy(): void;
}
