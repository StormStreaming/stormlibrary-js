import { IBufferConfig } from "./IBufferConfig";
import { IVideoConfig } from "./IVideoConfig";
import { IAudioConfig } from "./IAudioConfig";
import { IDebugConfig } from "./IDebugConfig";
export interface ISettingsConfig {
    autostart?: boolean;
    restartOnError?: boolean;
    reconnectTime?: number;
    enabledProtocols: string[];
    buffer?: IBufferConfig;
    video: IVideoConfig;
    audio?: IAudioConfig;
    debug?: IDebugConfig;
}
