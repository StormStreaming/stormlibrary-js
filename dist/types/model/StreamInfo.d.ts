export declare class StreamInfo {
    private label;
    private width;
    private height;
    private fps;
    private bitrate;
    constructor(config: any);
    getLabel(): string;
    getWidth(): number;
    getHeight(): number;
    getFPS(): number;
    getBitrate(): number;
    toString(): string;
}
