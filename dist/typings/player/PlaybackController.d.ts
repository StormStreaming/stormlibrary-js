import { IPlayer } from "./IPlayer";
import { StormLibrary } from "../StormLibrary";
export declare class PlaybackController {
    private readonly LOG_ACTIVITY;
    private readonly LOG_DELAY;
    private videoObject;
    private interval;
    private targetValue;
    private minValue;
    private maxValue;
    private alreadySeeked;
    private logger;
    private isStable;
    private hlsDone;
    constructor(main: StormLibrary, player: IPlayer);
    start(): void;
    private onIntervalEvent;
    stop(): void;
}
