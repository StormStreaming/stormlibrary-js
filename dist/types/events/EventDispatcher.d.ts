import { EventListener } from "./EventListener";
import { StormEvent } from "./StormEvent";
export declare class EventDispatcher {
    protected eventListeners: Array<EventListener>;
    addEventListener(eventName: string | number, callback: any, thisRef?: any, priority?: number, logMessage?: string | null): boolean;
    removeEventListener(eventName: string, callback: any): boolean;
    private sortEvents;
    dispatchEvent(stormEvent: StormEvent): void;
    protected removeAllEventListener(): void;
}
