export declare class InputDevice {
    private inputType;
    private label;
    private id;
    private groupID;
    constructor(inputDevice: any, number: number);
    private cleanLabel;
    getLabel(): string;
    getDeviceID(): string;
    getGroupID(): string;
}
