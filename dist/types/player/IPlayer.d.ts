import { PlayerType } from "./enum/PlayerTypes";
import { StormMetaDataItem } from "../model/StormMetaDataItem";
export interface IPlayer {
    start(): void;
    stop(): void;
    restart(): void;
    play(): void;
    pause(): void;
    onVideoPlay(): void;
    onVideoPause(): void;
    onVideoStop(): void;
    seek(time: number): boolean;
    getTime(): number;
    getAbsoluteTime(): number;
    isPlaying(): boolean;
    getMetaData(): StormMetaDataItem | null;
    onMetaData(metaData: StormMetaDataItem): void;
    destroy(): void;
    getPlayerType(): PlayerType;
    setURL(url: string): void;
    getIfStoppedByBrowser(): boolean;
}
