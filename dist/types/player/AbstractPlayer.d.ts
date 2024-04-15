import { PlayerType } from "./enum/PlayerTypes";
import { StormLibrary } from "../StormLibrary";
import { Logger } from "../logger/Logger";
import { StormMetaDataItem } from "../model/StormMetaDataItem";
export declare class AbstractPlayer {
    protected main: StormLibrary;
    protected logger: Logger;
    protected playerType: PlayerType;
    protected metaData: StormMetaDataItem | null;
    protected stoppedByBrowser: boolean;
    getPlayerType(): PlayerType;
    getMetaData(): StormMetaDataItem | null;
    onMetaData(metadata: StormMetaDataItem): void;
    getIfStoppedByBrowser(): boolean;
}
