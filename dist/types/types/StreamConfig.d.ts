import { SecurityConfig } from "./SecurityConfig";
import { ServerListConfig } from "./ServerListConfig";
import { SourceListConfig } from "./SourceListConfig";
export type StreamConfig = {
    streamKey?: string;
    serverList?: ServerListConfig[];
    sourceList?: SourceListConfig[];
    security?: SecurityConfig;
};
