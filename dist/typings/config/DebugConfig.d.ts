import { IConfig } from "./IConfig";
import { LogType } from "./enum/LogType";
import { Logger } from "../logger/Logger";
export declare class DebugConfig implements IConfig {
    private readonly PRINT_ON_STARTUP;
    private debugConfig;
    private consoleEnabled;
    private consoleLogTypes;
    private consoleMonoColor;
    private containerEnabled;
    private containerLogTypes;
    private containerID;
    private containerMonoColor;
    constructor(debugConfig: any);
    parse(debugConfig: any): void;
    isConsoleEnabled(): boolean;
    getConsoleLogTypes(): Array<LogType>;
    isContainerEnabled(): boolean;
    isConsoleMonoColor(): boolean;
    getContainerLogTypes(): Array<LogType>;
    getContainerID(): any;
    isContainerMonoColor(): boolean;
    setConfig(config: any): void;
    print(logger: Logger, force?: boolean): void;
}
