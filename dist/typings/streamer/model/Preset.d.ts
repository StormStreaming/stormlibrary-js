import { CodecType } from "../enum/CodecType";
export declare class Preset {
    private static readonly DEFAULT_VIDEO_BITRATE;
    private static readonly DEFAULT_AUDIO_BITRATE;
    private static readonly DEFAULT_FPS;
    private static readonly DEFAULT_VIDEO_CODEC;
    private static readonly DEFAULT_AUDIO_CODEC;
    private width;
    private height;
    private videoCodec;
    private audioCodec;
    private videoBitrate;
    private audioBitrate;
    private fps;
    private label;
    constructor(preset: any);
    getLabel(): string;
    getWidth(): any;
    getHeight(): any;
    getFPS(): number;
    getVideoCodec(): CodecType;
    getAudioCodec(): CodecType;
    getVideoBitrate(): number;
    getAudioBitrate(): number;
}
