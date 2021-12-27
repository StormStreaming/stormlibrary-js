import { IConfig } from "./IConfig";
import { Preset } from "../streamer/model/Preset";
import { Logger } from "../logger/Logger";
export declare class PresetConfig implements IConfig {
    private static readonly DEFAULT_PRESET;
    private readonly PRINT_ON_STARTUP;
    private presetList;
    private presetConfig;
    constructor(presetConfig: any);
    parse(config: any): void;
    setConfig(config: any): void;
    getConfig(): any;
    getPresets(): Array<Preset>;
    print(logger: Logger, force?: boolean): void;
}
