import { StormLibrary } from "../StormLibrary";
import { Logger } from "../logger/Logger";
export declare class VideoContainer {
    private readonly LOG_ACTIVITY;
    containerID: string;
    private videoElement;
    private videoContainer;
    private parentContainer;
    private containerWidth;
    private tempContainerWidth;
    private containerHeight;
    private tempContainerHeight;
    private scalingMode;
    private videoWidth;
    private videoHeight;
    private player;
    private main;
    protected logger: Logger;
    private wasUnmuted;
    private isMuted;
    private currentVolume;
    private forceMute;
    private resizeObserver;
    private isInFullScreenMode;
    private hadPlayed;
    constructor(main: StormLibrary);
    initialize(): void;
    private onFullScreenChange;
    onResize: () => void;
    private configureVideoElement;
    private attachEvents;
    private resizeVideo;
    private scaleVideo;
    dispatchVolumeEvent(): void;
    play(): void;
    mute(): void;
    unmute(): void;
    setVolume(newVolume: number): void;
    getVolume(): number;
    getVideoObject(): HTMLVideoElement;
    destroy(force?: boolean): void;
    setScalingMode(newMode: string): void;
    getScalingMode(): string;
    makeScreenshot(): any;
    setSize(width: number | string, height: number | string): void;
    setWidth(width: number | string): void;
    setHeight(height: number | string): void;
    enterFullScreen(): void;
    exitFullScreen(): void;
    isFullScreenMode(): boolean;
    getWidth(): number;
    getHeight(): number;
    getHTMLElement(): HTMLElement;
}
