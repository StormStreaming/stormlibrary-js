import { ProtocolType } from "../config/enum/ProtocolType";
import { ISourceItem } from "../model/ISourceItem";
import { RTMPSourceItem } from "../model/RTMPSourceItem";
import { StormSourceItem } from "../model/StormSourceItem";
import { StormLibrary } from "../StormLibrary";
import { AbstractPlayer } from "./AbstractPlayer";
import { IPlayer } from "./IPlayer";
import { VideoContainer } from "./VideoContainer";
export declare class MSEPlayer extends AbstractPlayer implements IPlayer {
    private readonly LOG_ACTIVITY;
    private connection;
    private mediaSource;
    private segmentsQueue;
    private commandQueue;
    private sourceBuffer;
    private bufferUpdateGuard;
    private dummyRestart;
    private metaData;
    private restartOnResume;
    private playbackController;
    constructor(main: StormLibrary, video: VideoContainer);
    start(): void;
    play(force?: boolean): void;
    pause(): void;
    onVideoMetadata(event: any): void;
    onTimeUpdate(event: any): void;
    onConnectionStart(): void;
    stop(): void;
    onVideoPlay(): void;
    onVideoPause(): void;
    onSourceOpen(): void;
    onSocketMessage(event: any): void;
    onBufferUpdated(): void;
    private processEvent;
    onSocketError(shouldReconnect: boolean, reconnectTime: number): void;
    onAllServersFailed(): void;
    pickBestSource(sourceList: Array<ISourceItem>, protocolTypes: Array<ProtocolType>): StormSourceItem | RTMPSourceItem;
    setQuality(sourceName: string): boolean;
    seek(time: number): boolean;
    addStreamSource(sourceItem: any, addAndPlay: boolean): boolean;
    restart(): void;
    destroy(force?: boolean): void;
}
