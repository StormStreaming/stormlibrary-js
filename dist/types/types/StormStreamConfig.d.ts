import { StreamConfig } from "./StreamConfig";
import { SettingsConfig } from "./SettingsConfig";
export type StormStreamConfig = {
    role?: "player" | "streamer";
    configurationType?: "embedded" | "gateway";
    stream: StreamConfig;
    settings: SettingsConfig;
    demoMode?: boolean;
};
