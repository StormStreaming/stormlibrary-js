import { Logger } from "../logger/Logger";
import { IConfig } from "./IConfig";
export declare class AudioConfig implements IConfig {
    private readonly PRINT_ON_STARTUP;
    private volumeConfig;
    private startVolume;
    private maxVolume;
    private rememberValue;
    constructor(volumeConfig: any);
    parse(config: any): void;
    getStartVolume(): number;
    setStartVolume(newValue: number): void;
    getMaxVolume(): number;
    setMaxVolume(newValue: number): void;
    isRememberValue(): boolean;
    setRememberValue(newValue: boolean): void;
    setConfig(config: any): void;
    print(logger: Logger, force?: boolean): void;
}
