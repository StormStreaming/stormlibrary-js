import { SecurityConfig } from "./SecurityConfig";
import { ServerListConfig } from "./ServerListConfig";
import { SourceListConfig } from "./SourceListConfig";
import { GatewayListConfig } from "./GatewayListConfig";
export declare type StreamConfig = {
    gatewayList?: GatewayListConfig[];
    groupName?: string;
    serverList?: ServerListConfig[];
    sourceList?: SourceListConfig[];
    security?: SecurityConfig;
};
