import { StormLibraryEvent } from "./StormLibraryEvent";
import { StormLibraryListener } from "./StormLibraryListener";
import { Logger } from "../logger/Logger";
export declare class EventDispatcher {
    protected logger: Logger;
    protected listeners: {
        [K in keyof StormLibraryEvent]?: Array<StormLibraryListener<K>>;
    };
    constructor();
    addEventListener<K extends keyof StormLibraryEvent>(eventName: K, listener: (ev: StormLibraryEvent[K]) => void, removable?: boolean): boolean;
    removeEventListener<K extends keyof StormLibraryEvent>(eventName: K, listener?: (ev: StormLibraryEvent[K]) => void): boolean;
    removeAllEventListeners<K extends keyof StormLibraryEvent>(): void;
    dispatchEvent<K extends keyof StormLibraryEvent>(eventName: K, event: StormLibraryEvent[K]): void;
}
