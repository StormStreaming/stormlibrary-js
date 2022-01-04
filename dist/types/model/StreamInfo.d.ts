export declare class StreamInfo {
    private label;
    private width;
    private height;
    private fps;
    private bitRate;
    constructor(config: any);
    getLabel(): string;
    getWidth(): number;
    getHeight(): number;
    getFPS(): number;
    getBitRate(): number;
}
