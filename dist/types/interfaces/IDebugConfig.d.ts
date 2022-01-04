export interface IDebugConfig {
    console?: IDebugConsoleConfig;
    container?: IDebugContainerConfig;
}
export interface IDebugConsoleConfig {
    enabled?: boolean;
    logTypes?: Array<string>;
    monoColor?: false;
}
export interface IDebugContainerConfig {
    enabled?: boolean;
    logTypes?: Array<string>;
    monoColor?: false;
}
