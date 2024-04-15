import { StormLibrary } from "../StormLibrary";
import { StormMetaDataItem } from "../model/StormMetaDataItem";
import { StormStreamConfig } from "../types/StormStreamConfig";
import { ISourceItem } from "../model/ISourceItem";
export interface StormLibraryEvent {
    "playerCoreReady": {
        ref: StormLibrary;
    };
    "serverConnectionInitiate": {
        ref: StormLibrary;
        serverURL: string;
    };
    "serverConnect": {
        ref: StormLibrary;
        serverURL: string;
    };
    "serverDisconnect": {
        ref: StormLibrary;
        serverURL: string;
        restart: boolean;
    };
    "serverConnectionError": {
        ref: StormLibrary;
        serverURL: string;
        restart: boolean;
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
    "playbackInitiate": {
        ref: StormLibrary;
        streamKey: string;
    };
    "bufferingStart": {
        ref: StormLibrary;
        mode: string;
    };
    "bufferingComplete": {
        ref: StormLibrary;
        mode: string;
    };
    "playbackStart": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "playbackPause": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "playbackStop": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "playbackProgress": {
        ref: StormLibrary;
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
        streamKey: string;
    };
    "optionalStreamData": {
        ref: StormLibrary;
        optData: any;
    };
    "subscriptionComplete": {
        ref: StormLibrary;
        sourceList: Array<ISourceItem>;
    };
    "streamStateChange": {
        ref: StormLibrary;
        streamKey: string;
        state: "AWAITING" | "NOT_PUBLISHED" | "UNPUBLISHED" | "PUBLISHED" | "CLOSED" | "UNKNOWN";
    };
    "streamStop": {
        ref: StormLibrary;
        streamKey: string;
    };
    "streamSourceAdd": {
        ref: StormLibrary;
        mode: string;
        streamKey: string;
    };
    "sourceListUpdate": {
        ref: StormLibrary;
        sourceList: Array<ISourceItem>;
    };
    "metadataReceived": {
        ref: StormLibrary;
        metadata: StormMetaDataItem;
    };
    "volumeChange": {
        ref: StormLibrary;
        mode: string;
        volume: number;
        muted: boolean;
        invokedBy: "user" | "browser";
    };
    "videoElementCreate": {
        ref: StormLibrary;
        videoElement: HTMLVideoElement;
    };
    "videoUnmuted": {
        ref: StormLibrary;
    };
    "SSLError": {
        ref: StormLibrary;
        mode: string;
    };
    "incompatibleProtocol": {
        ref: StormLibrary;
        clientProtocolVer: number;
        serverProtocolVersion: number;
    };
    "authorizationError": {
        ref: StormLibrary;
    };
    "authorizationComplete": {
        ref: StormLibrary;
    };
    "invalidLicense": {
        ref: StormLibrary;
    };
    "streamConfigChange": {
        ref: StormLibrary;
        newConfig: StormStreamConfig;
    };
    "fullScreenEnter": {
        ref: StormLibrary;
    };
    "fullScreenExit": {
        ref: StormLibrary;
    };
}
