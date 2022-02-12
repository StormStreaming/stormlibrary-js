import { StreamConfig } from "./StreamConfig";
import { SettingsConfig } from "./SettingsConfig";
export declare type StormLibraryConfig = {
    role?: string;
    connectionType: string;
    stream: StreamConfig;
    settings: SettingsConfig;
};
