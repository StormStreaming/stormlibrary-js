import { IConfig } from "./IConfig";
import { Logger } from "../logger/Logger";
export declare class StorageConfig implements IConfig {
    private readonly PRINT_ON_STARTUP;
    private storageConfig;
    private storageEnabled;
    private prefix;
    constructor(storageConfig: any);
    parse(storageConfig: any): void;
    isStorageEnabled(): boolean;
    getPrefix(): string;
    setConfig(config: any): void;
    print(logger: Logger, force?: boolean): void;
}
