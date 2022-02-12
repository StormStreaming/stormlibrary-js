import { StreamInfoConfig } from "./StreamInfoConfig";
export declare type SourceListConfig = {
    host?: string;
    application: string;
    streamName: string;
    protocol: string;
    streamInfo?: StreamInfoConfig;
};
