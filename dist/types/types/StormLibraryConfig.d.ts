import { StreamConfig } from "./StreamConfig";
import { SettingsConfig } from "./SettingsConfig";
export type StormLibraryConfig = {
    role?: "player" | "streamer";
    configurationType: "embedded" | "gateway";
    stream: StreamConfig;
    settings: SettingsConfig;
};
