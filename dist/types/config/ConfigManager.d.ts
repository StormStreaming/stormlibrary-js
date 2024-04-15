import { IConfig } from "./IConfig";
import { RoleType } from "./enum/RoleType";
import { StreamConfig } from "./StreamConfig";
import { SettingsConfig } from "./SettingsConfig";
import { ConfigurationType } from "./enum/ConnectionType";
import { Logger } from "../logger/Logger";
export declare class ConfigManager implements IConfig {
    private readonly PRINT_ON_STARTUP;
    private config;
    private configurationType;
    private roleType;
    private stream;
    private settings;
    private demoMode;
    constructor(config: any);
    parse(config: any): void;
    getConfigurationType(): ConfigurationType;
    getRole(): RoleType;
    getStream(): StreamConfig;
    getSettings(): SettingsConfig;
    setConfig(config: any): void;
    getIfDemoMode(): boolean;
    print(logger: Logger, force?: boolean): void;
}
