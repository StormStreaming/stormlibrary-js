import { IStreamConfig } from "./IStreamConfig";
import { ISettingsConfig } from "./ISettingsConfig";
export declare type StormLibraryConfig = {
    role: string;
    connection: string;
    stream: IStreamConfig;
    settings: ISettingsConfig;
};
