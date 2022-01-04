import { StreamConfig } from "./StreamConfig";
import { SettingsConfig } from "./SettingsConfig";
export declare type StormLibraryConfig = {
    role: string;
    connection: string;
    stream: StreamConfig;
    settings: SettingsConfig;
};
