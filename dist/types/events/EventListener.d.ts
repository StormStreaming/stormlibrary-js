import { StormLibraryEvent } from "./Events";
export type EventListener<K extends keyof StormLibraryEvent> = [K, (ev: StormLibraryEvent[K]) => void, boolean];
