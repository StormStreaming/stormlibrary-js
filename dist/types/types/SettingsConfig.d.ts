import { BufferConfig } from "./BufferConfig";
import { VideoConfig } from "./VideoConfig";
import { AudioConfig } from "./AudioConfig";
import { DebugConfig } from "./DebugConfig";
export declare type SettingsConfig = {
    autostart?: boolean;
    restartOnFocus?: boolean;
    restartOnError?: boolean;
    reconnectTime?: number;
    enabledProtocols: string[];
    buffer?: BufferConfig;
    video?: VideoConfig;
    audio?: AudioConfig;
    debug?: DebugConfig;
};
