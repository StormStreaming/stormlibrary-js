import { StormLibrary } from "../StormLibrary";
import { VideoContainer } from "./VideoContainer";
import { ISourceItem } from "../model/ISourceItem";
import { PlayerState } from "./enum/PlayerState";
import { Logger } from "../logger/Logger";
import { RTMPSourceItem } from "../model/RTMPSourceItem";
import { StormSourceItem } from "../model/StormSourceItem";
import { WebRTCSourceItem } from "../model/WebRTCSourceItem";
import { PlayerType } from "./enum/PlayerTypes";
import { ProtocolType } from "../config/enum/ProtocolType";
export declare class AbstractPlayer {
    protected main: StormLibrary;
    protected video: VideoContainer;
    protected sourceList: Array<ISourceItem>;
    protected playerState: PlayerState;
    protected restartTimer: any;
    protected broadcastTime: number;
    protected absoluteBroadcastTime: number;
    protected logger: Logger;
    protected selectedSource: RTMPSourceItem | StormSourceItem | WebRTCSourceItem;
    protected playerType: PlayerType;
    protected seekTime: number;
    protected seekMode: boolean;
    constructor(main: StormLibrary, video: VideoContainer);
    start(): void;
    play(): void;
    pause(): void;
    onVideoPlay(): void;
    onVideoPause(): void;
    onVideoStop(): void;
    onVideoMetadata(event: any): void;
    pickBestSource(sourceList: Array<ISourceItem>, protocolTypes: Array<ProtocolType>): ISourceItem;
    seek(time: number): boolean;
    protected ifRequireInteraction(): boolean;
    isPlaying(): boolean;
    getPlaybackStatus(): string;
    selectSource(sourceItem: any): void;
    togglePlay(): void;
    restart(): void;
    getCurrentQuality(): string;
    getVideoContainer(): VideoContainer;
    getTime(): number;
    getAbsoluteTime(): number;
    getPlayerState(): PlayerState;
    getCurrentSource(): any;
    getPlayerType(): PlayerType;
    destroy(): void;
    isInSeekMode(): boolean;
    setSeekValue(newValue: number): void;
}
