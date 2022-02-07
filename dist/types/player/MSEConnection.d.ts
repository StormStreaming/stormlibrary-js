import { AbstractSocket } from "./AbstractSocket";
import { StormLibrary } from "../StormLibrary";
import { MSEPlayer } from "./MSEPlayer";
import { RTMPSourceItem } from "../model/RTMPSourceItem";
import { StormSourceItem } from "../model/StormSourceItem";
import { IServerItem } from "../model/IServerItem";
export declare class MSEConnection extends AbstractSocket {
    private readonly LOG_ACTIVITY;
    private main;
    private player;
    private logger;
    private videoSource;
    private seekStart;
    constructor(main: StormLibrary, player: MSEPlayer);
    protected createSocket(serverData: IServerItem): void;
    startMSEConnection(videoSource: RTMPSourceItem | StormSourceItem, seekTime: number): void;
    protected onSocketOpen(event: any): void;
    protected onSocketClose(event: any): void;
    protected onSocketMessage(event: any): void;
    protected onSocketError(event: any): void;
    protected onAllServersError(): void;
    destroy(): void;
}
