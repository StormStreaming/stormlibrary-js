import { DebugConfig } from "../config/DebugConfig";
import { StormLibrary } from "../StormLibrary";
export declare class Logger {
    private static INFO_COLOR;
    private static WARNING_COLOR;
    private static ERROR_COLOR;
    private static SUCCESS_COLOR;
    private static TRACE_COLOR;
    private debugConfig;
    private stormPlayer;
    private colorOrder;
    private monoColor;
    private logMemory;
    private libraryInstanceID;
    private playerInstanceID;
    constructor(config: DebugConfig, stormLibrary: StormLibrary);
    info(objectName: any, message: string): void;
    warning(objectName: any, message: string): void;
    error(objectName: any, message: string): void;
    success(objectName: any, message: string): void;
    trace(objectName: any, message: string): void;
    private logData;
    private writeToContainer;
    setPlayerID(playerID: number): void;
    getAllLogs(): Array<string>;
}
