export declare type DebugConfig = {
    console?: IDebugConsoleConfig;
    container?: IDebugContainerConfig;
};
export declare type IDebugConsoleConfig = {
    enabled?: boolean;
    logTypes?: Array<string>;
    monoColor?: false;
};
export declare type IDebugContainerConfig = {
    enabled?: boolean;
    logTypes?: Array<string>;
    monoColor?: false;
};
