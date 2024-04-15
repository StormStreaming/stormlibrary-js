export type DebugConfig = {
    console?: IDebugConsoleConfig;
    container?: IDebugContainerConfig;
};
export type IDebugConsoleConfig = {
    enabled?: boolean;
    logTypes?: Array<string>;
    monoColor?: false;
};
export type IDebugContainerConfig = {
    enabled?: boolean;
    logTypes?: Array<string>;
    monoColor?: false;
};
