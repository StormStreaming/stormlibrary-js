import { StormLibrary } from "../StormLibrary";
import { MetaDataItem } from "../model/MetaDataItem";
export interface StormLibraryEvent {
    "libraryReady": {
        ref: StormLibrary;
        mode: "mse" | "hls" | "webrtc";
    };
    "libraryConnected": {
        ref: StormLibrary;
        mode: string;
        serverURL: string;
    };
    "libraryDisconnected": {
        ref: StormLibrary;
        mode: string;
        serverURL: string;
    };
    "libraryConnectionFailed": {
        ref: StormLibrary;
        mode: string;
        serverURL: string;
    };
    "allConnectionsFailed": {
        ref: StormLibrary;
        mode: string;
    };
    "interactionRequired": {
        ref: StormLibrary;
        mode: string;
    };
    "compatibilityError": {
        ref: StormLibrary;
        message: string;
    };
    "playbackInitiated": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "streamBuffering": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "playbackStarted": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "playbackPaused": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "playbackStopped": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "playbackProgress": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
        streamStartTime: number;
        streamDuration: number;
        playbackStartTime: number;
        playbackDuration: number;
        dvrCacheSize: number;
    };
    "playbackError": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "streamNotFound": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "newStreamSourceAdded": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "metadataReceived": {
        ref: StormLibrary;
        mode: string;
        metadata: MetaDataItem;
        streamKey: string;
    };
    "volumeChanged": {
        ref: StormLibrary;
        mode: string;
        volume: number;
        muted: boolean;
        invokedBy: "user" | "browser";
    };
    "videoElementCreated": {
        ref: StormLibrary;
        videoElement: HTMLVideoElement;
    };
    "SSLError": {
        ref: StormLibrary;
        mode: string;
    };
}
