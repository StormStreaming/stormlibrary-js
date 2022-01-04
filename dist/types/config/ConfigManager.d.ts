import { IConfig } from "./IConfig";
import { RoleType } from "./enum/RoleType";
import { StreamConfig } from "./StreamConfig";
import { SettingsConfig } from "./SettingsConfig";
import { ConnectionType } from "./enum/ConnectionType";
import { Logger } from "../logger/Logger";
export declare class ConfigManager implements IConfig {
    private readonly PRINT_ON_STARTUP;
    private config;
    private connectionType;
    private roleType;
    private stream;
    private settings;
    constructor(config: any);
    parse(config: any): void;
    getConnectionType(): ConnectionType;
    getRole(): RoleType;
    getStream(): StreamConfig;
    getSettings(): SettingsConfig;
    setConfig(config: any): void;
    print(logger: Logger, force?: boolean): void;
}
