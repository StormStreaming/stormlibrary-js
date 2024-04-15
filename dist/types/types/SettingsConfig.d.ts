import { BufferConfig } from "./BufferConfig";
import { VideoConfig } from "./VideoConfig";
import { AudioConfig } from "./AudioConfig";
import { DebugConfig } from "./DebugConfig";
export type SettingsConfig = {
    autoStart?: boolean;
    restartOnFocus?: boolean;
    restartOnError?: boolean;
    reconnectTime?: number;
    enabledProtocols?: string[];
    buffer?: BufferConfig;
    video?: VideoConfig;
    audio?: AudioConfig;
    debug?: DebugConfig;
};
