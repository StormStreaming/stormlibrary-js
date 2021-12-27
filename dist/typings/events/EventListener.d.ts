export declare class EventListener {
    private readonly eventName;
    private readonly callback;
    private readonly thisRef;
    private readonly priority;
    private readonly logMessage;
    constructor(eventName: string, callback: any, thisRef: any, priority?: number, logMessage?: string | null);
    getEventName(): string;
    getCallback(): any;
    getThisRef(): any;
    getPriority(): number;
    getLogMessage(): string | null;
}
