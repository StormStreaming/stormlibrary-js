import { VideoContainer } from "./VideoContainer";
import { PlayerType } from "./enum/PlayerTypes";
export interface IPlayer {
    start(): void;
    stop(): void;
    destroy(force: boolean): void;
    restart(): void;
    play(force: boolean): void;
    pause(): void;
    togglePlay(): void;
    onVideoPlay(): void;
    onVideoPause(): void;
    onVideoStop(): void;
    seek(time: number): boolean;
    getTime(): number;
    getAbsoluteTime(): number;
    isPlaying(): boolean;
    getPlaybackStatus(): string;
    getCurrentSource(): any;
    addStreamSource(sourceItem: any, addAndPlay: boolean): boolean;
    setQuality(sourName: string): boolean;
    getCurrentQuality(): string;
    onVolumeChange(event: any): void;
    onVideoMetadata(event: any): void;
    getVideoContainer(): VideoContainer;
    getPlayerType(): PlayerType;
}
