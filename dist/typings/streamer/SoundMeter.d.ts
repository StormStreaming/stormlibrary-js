import { WebRTCStreamer } from "./WebRTCStreamer";
export declare class SoundMeter {
    private streamer;
    private stream;
    private instant;
    private slow;
    private clip;
    private audioContext;
    private script;
    private microphone;
    private processor;
    constructor(streamer: WebRTCStreamer);
    attach(stream: MediaStream): void;
    detach(): void;
    private clear;
    onAudioProcess(event: any, thisRef: SoundMeter): void;
}
