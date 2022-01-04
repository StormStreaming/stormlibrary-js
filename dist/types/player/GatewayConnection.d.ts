import { AbstractSocket } from "./AbstractSocket";
import { StormLibrary } from "../StormLibrary";
import { IServerItem } from "../model/IServerItem";
export declare class GatewayConnection extends AbstractSocket {
    private readonly LOG_ACTIVITY;
    private main;
    private logger;
    private acquiredServerList;
    private acquiredSourceList;
    constructor(main: StormLibrary);
    protected createSocket(serverData: IServerItem): void;
    protected onSocketOpen(event: any): void;
    protected onSocketClose(event: any): void;
    protected onSocketMessage(event: any): void;
    protected onSocketError(event: any): void;
    protected onAllServersError(): void;
    destroy(): void;
}
