import { ISecurityConfig } from "./ISecurityConfig";
import { IServerListConfig } from "./IServerListConfig";
import { ISourceListConfig } from "./ISourceListConfig";
import { IGatewayListConfig } from "./IGatewayListConfig";
export interface IStreamConfig {
    gatewayList?: IGatewayListConfig[];
    groupName?: string;
    serverList?: IServerListConfig[];
    sourceList?: ISourceListConfig[];
    security?: ISecurityConfig;
}
