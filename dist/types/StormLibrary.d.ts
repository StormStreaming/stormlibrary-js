import { ConfigManager } from "./config/ConfigManager";
import { EventDispatcher } from "./events/EventDispatcher";
import { Logger } from "./logger/Logger";
import { VideoContainer } from "./player/VideoContainer";
import { StorageManager } from "./storage/StorageManager";
import { StormStreamConfig } from "./types/StormStreamConfig";
import { PlaybackController } from "./player/PlaybackController";
import { ISourceItem } from "./model/ISourceItem";
import { SourceItem } from "./types/SourceItem";
import { StormLibraryEvent } from "./events/StormLibraryEvent";
export declare class StormLibrary extends EventDispatcher {
    private static NEXT_LIBRARY_ID;
    private readonly LIBRARY_VERSION;
    private readonly COMPILE_DATE;
    private readonly LIBRARY_BRANCH;
    private readonly PLAYER_PROTOCOL_VERSION;
    private config;
    private libraryID;
    private initialized;
    private videoContainer;
    private playbackController;
    private storageManager;
    private clientUser;
    private streamConfig;
    private wasUnmuted;
    constructor(streamConfig?: StormStreamConfig);
    initialize(): void;
    setStreamConfig(streamConfig: StormStreamConfig): void;
    play(): boolean;
    pause(): boolean;
    stop(): boolean;
    restart(): boolean;
    togglePlay(): boolean;
    seek(newPoint: number): boolean;
    isPlaying(): boolean;
    getPlaybackState(): string;
    getStreamState(): string;
    mute(): boolean;
    unmute(): boolean;
    isMute(): boolean;
    toggleMute(): boolean;
    setVolume(newVolume: number): boolean;
    getVolume(): any;
    getPlaybackController(): PlaybackController;
    getSourceList(): ISourceItem[];
    removeAllSources(): void;
    getCurrentSourceItem(): ISourceItem | null;
    addSourceItem(sourceItem: SourceItem | ISourceItem, addAndPlay: boolean): void;
    playSource(sourceItem: ISourceItem): void;
    subscribe(streamKey: string, andPlay: boolean): void;
    getAbsoluteStreamTime(): number;
    setSize(width: number | string, height: number | string): void;
    setWidth(width: number | string): void;
    setHeight(height: number | string): void;
    getWidth(): number;
    getHeight(): number;
    setScalingMode(newMode: string): void;
    getScalingMode(): string;
    enterFullScreen(): void;
    exitFullScreen(): void;
    isFullScreenMode(): boolean;
    getLibraryID(): number;
    getStreamConfig(): StormStreamConfig;
    getConfigManager(): ConfigManager;
    getLogger(): Logger;
    getSettingsAsJSON(): string;
    getSettings(): any;
    getPlayerProtocolVersion(): number;
    isInitialized(): boolean;
    isConnected(): boolean;
    isAuthorized(): boolean;
    getRole(): string;
    getVersion(): string;
    getBranch(): string;
    getStorageManager(): StorageManager;
    getVideoElement(): HTMLVideoElement | undefined;
    getVideoContainer(): VideoContainer;
    getIfUnmuted(): boolean;
    dispatchEvent<K extends keyof StormLibraryEvent>(eventName: K, event: StormLibraryEvent[K]): void;
    destroy(): void;
}
