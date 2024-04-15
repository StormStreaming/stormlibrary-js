import { IConfig } from "./IConfig";
import { ScalingType } from "./enum/ScalingType";
import { Logger } from "../logger/Logger";
export declare class VideoConfig implements IConfig {
    private videoConfig;
    private scalingMode;
    private containerID;
    private aspectRatio;
    private videoWidthValue;
    private isVideoWidthInPixels;
    private wasVideoWidthProvided;
    private videoHeightValue;
    private isVideoHeightInPixels;
    private wasVideoHeightProvided;
    constructor(videoConfig: any);
    parse(config: any): void;
    getScalingMode(): ScalingType;
    setConfig(config: any): void;
    getContainerID(): string;
    getVideoWidthValue(): number;
    getIfVideoWidthInPixels(): boolean;
    getIfVideoWidthWasProvided(): boolean;
    getVideoHeightValue(): number;
    getIfVideoHeightInPixels(): boolean;
    getIfVideoHeightWasProvided(): boolean;
    getAspectRatio(): string;
    setVideoWidthValue(newWidth: number): void;
    setIfVideoWidthInPixels(value: boolean): void;
    setVideoHeightValue(newHeight: number): void;
    setIfVideoHeightInPixels(value: boolean): void;
    setContainerID(newContainerID: string): void;
    setScalingMode(newScalingMode: string): void;
    print(logger: Logger): void;
}
