export declare class StormEvent {
    private readonly dispatcher;
    private readonly info;
    private readonly eventName;
    constructor(dispatcher: any, eventName: string, info?: any);
    getDispatcher(): any;
    getEventName(): string;
    getInfo(): any;
}
