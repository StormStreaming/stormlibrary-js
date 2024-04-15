export declare class ApplicationInfo {
    private name;
    private dvrEnabled;
    private type;
    constructor(name: string, dvrEnabled: boolean, type: string);
    getName(): string;
    getType(): string;
    getIfDVREnabled(): boolean;
}
