import { IConfig } from "./IConfig";
import { ScalingType } from "./enum/ScalingType";
import { Logger } from "../logger/Logger";
export declare class VideoConfig implements IConfig {
    private videoConfig;
    private scalingMode;
    private containerID;
    private containerWidth;
    private containerHeight;
    constructor(videoConfig: any);
    parse(config: any): void;
    getScalingMode(): ScalingType;
    setConfig(config: any): void;
    getContainerID(): string;
    getContainerWidth(): number;
    getContainerHeight(): number;
    setContainerWidth(newWidth: number): void;
    setContainerHeight(newHeight: number): void;
    setContainerID(newContainerID: string): void;
    setScalingMode(newScalingMode: string): void;
    print(logger: Logger): void;
}
