import { StormLibraryEvent } from "./StormLibraryEvent";
import { Logger } from "../logger/Logger";
export declare class EventDispatcher {
    protected logger: Logger;
    private listeners;
    addEventListener<K extends keyof StormLibraryEvent>(eventName: K, listener: (ev: StormLibraryEvent[K]) => void, removable?: boolean): boolean;
    removeEventListener<K extends keyof StormLibraryEvent>(eventName: K, listener?: (ev: StormLibraryEvent[K]) => void): boolean;
    removeAllEventListeners<K extends keyof StormLibraryEvent>(): void;
    dispatchEvent<K extends keyof StormLibraryEvent>(eventName: K, event: StormLibraryEvent[K]): void;
}
