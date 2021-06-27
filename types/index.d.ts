export as namespace StormLibrary;
export = StormLibrary;
declare namespace Storm {
    class CookieManager {
        protected setCookie(name: string, value: string, daysToExpire: number): boolean;
        protected getCookie(name: string): any;
        protected deleteCookie(name: string): boolean;
        protected onCookieError(error: any): void;
    }
}

declare namespace Storm {
    class NumberUtilities {
        static addLeadingZero(number: number): string;
    }
}

declare namespace Storm {
    class UserCapabilities {
        static hasMSESupport(): boolean;
        static hasWebSocketsSupport(): boolean;
        static isMobile(): boolean;
        static isCookieEnabled(): boolean;
        static getOSVersion(): string;
        static getBrowserName(): string;
        static getBrowserVersion(): number;
        static getFullBrowser(): {
            name: string;
            fullVersion: string;
            version: number;
        };
        static getOS(): string;
        static hasWebRTCSupport(): boolean;
        static hasHLSSupport(videoObject: HTMLVideoElement | null): boolean;
        static isSSL(): boolean;
    }
}

declare namespace Storm {
    enum ConnectionType {
        DIRECT = 0,
        GATEWAY = 1
    }
}

declare namespace Storm {
    enum LogType {
        TRACE = 0,
        INFO = 1,
        SUCCESS = 2,
        WARNING = 3,
        ERROR = 4
    }
}

declare namespace Storm {
    enum ProtocolType {
        RTMP = "RTMP",
        RTSP = "RTSP",
        WEBRTC = "WebRTC",
        HLS = "HLS",
        WEB_SOCKETS = "WebSockets",
        MPEG_DASH = "MpegDash",
        STORM = "Storm",
        MSE = "MSE"
    }
}

declare namespace Storm {
    enum RoleType {
        STREAMER = 0,
        PLAYER = 1
    }
}

declare namespace Storm {
    enum ScalingType {
        FILL = 0,
        LETTER_BOX = 1,
        CROP = 2,
        ORIGINAL = 3
    }
}

declare namespace Storm {
    enum SecurityType {
        NONE = 0,
        TOKEN = 1
    }
}

declare namespace Storm {
    enum BufferState {
        NOT_INITIALIZED = 0,
        AWAITING = 1,
        FEEDING = 2,
        DIGESTING = 3
    }
}

declare namespace Storm {
    enum ConnectionState {
        NOT_INITIALIZED = 0,
        STARTED = 1,
        CONNECTING = 2,
        CONNECTED = 3,
        CLOSED = 4
    }
}

declare namespace Storm {
    enum PlayerState {
        NOT_INITIALIZED = "notInitialized",
        INITIALIZED = "initialized",
        STARTED = "started",
        BUFFERING = "buffering",
        PLAYING = "playing",
        PAUSED = "paused",
        STOPPED = "stopped",
        DESTROYED = "destroyed"
    }
}

declare namespace Storm {
    class PlayerEvent {
        static readonly ON_PLAYER_READY: string;
        static readonly ON_PLAYER_START: string;
        static readonly ON_PLAYER_CONNECTING: string;
        static readonly ON_PLAYER_CONNECTED: string;
        static readonly ON_PLAYER_DISCONNECTED: string;
        static readonly ON_PLAYER_CONNECTION_FAILED: string;
        static readonly ON_PLAYER_STOP: string;
        static readonly ON_ALL_SERVERS_FAILED: string;
        static readonly ON_PLAYER_DESTROY: string;
        static readonly NO_STREAM_FOUND: string;
        static readonly STREAM_NOT_READY: string;
        static readonly COMPATIBILITY_ERROR: string;
        static readonly ON_INTERACTION_REQUIRED: string;
        static readonly ON_VIDEO_OBJECT_CREATION: string;
        static readonly ON_NEW_STREAM_SOURCE_ADDED: string;
        static readonly NO_SSL_ERROR: string;
        static readonly INCOMPATIBLE_PLAYER_PROTOCOL: string;
    }
}

declare namespace Storm {
    class VideoEvent {
        static readonly ON_VIDEO_CONNECTING = "videoConnecting";
        static readonly ON_VIDEO_PLAY = "videoPlay";
        static readonly ON_VIDEO_PAUSE = "videoPause";
        static readonly ON_VIDEO_BUFFERING = "videoBuffering";
        static readonly ON_VIDEO_METADATA = "videoMetadata";
        static readonly ON_VOLUME_CHANGE = "volumeChange";
        static readonly ON_VIDEO_STOP = "videoStop";
        static readonly ON_VIDEO_ERROR = "videoError";
        static readonly ON_VIDEO_PROGRESS = "videoProgress";
        static readonly ON_VIDEO_NOT_FOUND = "videoNotFound";
    }
}

declare namespace Storm {
    enum CodecType {
        H264 = 0,
        VP8 = 1,
        VP9 = 2,
        OPUS = 3,
        AAC = 4
    }
}

declare namespace Storm {
    enum InputType {
        VIDEO_INPUT = 0,
        AUDIO_INPUT = 1
    }
}

declare namespace Storm {
    class StreamerEvents {
        static readonly ON_STREAMER_READY: string;
        static readonly ON_STREAMER_START: string;
        static readonly ON_STREAMER_STOP: string;
        static readonly ON_STREAMER_CONNECTING: string;
        static readonly ON_STREAMER_CONNECTED: string;
        static readonly ON_STREAMER_DISCONNECTED: string;
        static readonly ON_STREAMER_CONNECTION_FAILED: string;
        static readonly ON_DEVICE_LIST: string;
        static readonly ON_NO_CAMERA_FOUND: string;
        static readonly ON_NO_MICROPHONE_FOUND: string;
        static readonly ON_INPUT_DEVICE_ERROR: string;
        static readonly COMPATIBILITY_ERROR: string;
        static readonly NO_SSL_ERROR: string;
        static readonly ON_INPUT_DEVICE_CHANGE: string;
        static readonly ON_STREAM_PUBLISHED: string;
        static readonly ON_STREAM_UNPUBLISHED: string;
        static readonly ON_STREAM_NAME_TAKEN: string;
        static readonly ON_INPUT_DEVICE_DENIED: string;
        static readonly ON_SOUND_METER: string;
    }
}

declare namespace Storm {
    class InputDevice {
        private inputType;
        private label;
        private id;
        private groupID;
        private originalInputDevice;
        constructor(inputDevice: any, number: number);
        private cleanLabel;
        getLabel(): string;
        getDeviceID(): string;
        getGroupID(): string;
    }
}

declare namespace Storm {
    class InputDeviceList {
        private internalList;
        constructor();
        push(item: InputDevice): number;
        get(id: number): InputDevice;
        getSize(): number;
        getArray(): Array<InputDevice>;
    }
}

declare namespace Storm {
    class Preset {
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
}

declare namespace Storm {
    class WebRTCConstraint {
        private isCameraEnabled;
        private isMicrophoneEnabled;
        private attachedCamera;
        private attachedMicrophone;
        private width;
        private height;
        private fps;
        constructor();
        setCameraStatus(newStatus: boolean): void;
        setMicrophoneStatus(newStatus: boolean): void;
        attachCamera(device: InputDevice): void;
        attachMicrophone(device: InputDevice): void;
        setFPS(newValue: number): void;
        createConstraint(): any;
    }
}

declare namespace Storm {
    class AudioConfig implements IConfig {
        private readonly PRINT_ON_STARTUP;
        private volumeConfig;
        private startVolume;
        private maxVolume;
        private rememberValue;
        constructor(volumeConfig: any);
        parse(config: any): void;
        getStartVolume(): number;
        getMaxVolume(): number;
        isRememberValue(): boolean;
        setConfig(config: any): void;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    class BufferConfig implements IConfig {
        private readonly PRINT_ON_STARTUP;
        private bufferConfig;
        private minValue;
        private maxValue;
        private startValue;
        private targetValue;
        constructor(bufferConfig: any);
        parse(bufferConfig: any): void;
        getMinValue(): number;
        getMaxValue(): number;
        getStartValue(): number;
        getTargetValue(): number;
        setConfig(config: any): void;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    class ConfigManager implements IConfig {
        private config;
        private connectionType;
        private roleType;
        private stream;
        private settings;
        constructor(config: any);
        parse(config: any): void;
        getConnectionType(): ConnectionType;
        getRole(): RoleType;
        getStream(): StreamConfig;
        getSettings(): SettingsConfig;
        setConfig(config: any): void;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    class DebugConfig implements IConfig {
        private readonly PRINT_ON_STARTUP;
        private debugConfig;
        private consoleEnabled;
        private consoleLogTypes;
        private consoleMonoColor;
        private containerEnabled;
        private containerLogTypes;
        private containerID;
        private containerMonoColor;
        constructor(debugConfig: any);
        parse(debugConfig: any): void;
        isConsoleEnabled(): boolean;
        getConsoleLogTypes(): Array<LogType>;
        isContainerEnabled(): boolean;
        isConsoleMonoColor(): boolean;
        getContainerLogTypes(): Array<LogType>;
        getContainerID(): any;
        isContainerMonoColor(): boolean;
        setConfig(config: any): void;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    interface IConfig {
        parse(config: any): void;
        setConfig(config: any): void;
        print(logger: Logger, force: boolean): void;
    }
}

declare namespace Storm {
    class PresetConfig implements IConfig {
        private static readonly DEFAULT_PRESET;
        private readonly PRINT_ON_STARTUP;
        private presetList;
        private presetConfig;
        constructor(presetConfig: any);
        parse(config: any): void;
        setConfig(config: any): void;
        getPresets(): Array<Preset>;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    class SecurityConfig implements IConfig {
        private readonly PRINT_ON_STARTUP;
        private securityConfig;
        private securityMethod;
        private token;
        constructor(config: any);
        parse(config: any): void;
        setConfig(config: any): void;
        getSecurityMethod(): SecurityType;
        getToken(): string;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    class SettingsConfig implements IConfig {
        private readonly PRINT_ON_STARTUP;
        private settingsConfig;
        private restartOnError;
        private reconnectTime;
        private autoStart;
        private enabledProtocols;
        private bufferConfig;
        private storageConfig;
        private videoConfig;
        private debugConfig;
        private audioConfig;
        private presetConfig;
        constructor(config: any);
        parse(config: any): void;
        getEnabledProtocols(): Array<ProtocolType>;
        getBufferConfig(): BufferConfig;
        getAudioConfig(): AudioConfig;
        getVideoConfig(): VideoConfig;
        getIfShouldRestartOnErrror(): boolean;
        getRecoonectTime(): number;
        getIfAutoStart(): boolean;
        getDebugConfig(): DebugConfig;
        getStorageConfig(): StorageConfig;
        setConfig(config: any): void;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    class StorageConfig implements IConfig {
        private readonly PRINT_ON_STARTUP;
        private storageConfig;
        private storageEnabled;
        private prefix;
        constructor(storageConfig: any);
        parse(storageConfig: any): void;
        isStorageEnabled(): boolean;
        getPrefix(): string;
        setConfig(config: any): void;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    class StreamConfig {
        private readonly PRINT_ON_STARTUP;
        private readonly DEFAULT_STORM_PORT;
        private readonly IS_SSL_BY_DEFAULT;
        private streamConfig;
        private serverList;
        private gatewayServerList;
        private sourceList;
        private securityConfig;
        private publishData;
        private roleType;
        private connectionType;
        private groupName;
        constructor(streamConfig: any, roleType: RoleType, connectionType: ConnectionType);
        parse(streamConfig: any, roleType: RoleType): void;
        getServerList(): Array<StormServerItem>;
        getSourceList(): Array<ISourceItem>;
        getGatewayServerList(): Array<GatewayServerItem>;
        getGroupName(): string;
        getSecurityConfig(): SecurityConfig;
        getPublishData(): IStreamItem;
        getConnectionType(): ConnectionType;
        setServerList(serverList: Array<StormServerItem>): void;
        setSourceList(sourceList: Array<ISourceItem>): void;
        print(logger: Logger, force?: boolean): void;
    }
}

declare namespace Storm {
    class VideoConfig implements IConfig {
        private videoConfig;
        private scalingMode;
        private containerID;
        private containerWidth;
        private containerHeight;
        constructor(videoConfig: any);
        parse(config: any): void;
        getScalingMode(): ScalingType;
        setConfig(config: any): void;
        getContainerID(): string;
        getContainerWidth(): number;
        getContainerHeight(): number;
        print(logger: Logger): void;
    }
}

declare namespace Storm {
    class EventDispatcher {
        protected eventListeners: Array<EventListener>;
        addEventListener(eventName: string | number, callback: any, thisRef?: any, priority?: number, logMessage?: string | null): boolean;
        removeEventListener(eventName: string, callback: any): boolean;
        private sortEvents;
        dispatchEvent(stormEvent: StormEvent): void;
        protected removeAllEventListener(): void;
    }
}

declare namespace Storm {
    class EventListener {
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
}

declare namespace Storm {
    class StormEvent {
        private readonly dispatcher;
        private readonly info;
        private readonly eventName;
        constructor(dispatcher: any, eventName: string, info?: any);
        getDispatcher(): any;
        getEventName(): string;
        getInfo(): any;
    }
}

declare namespace Storm {
    class Logger {
        private static INFO_COLOR;
        private static WARNING_COLOR;
        private static ERROR_COLOR;
        private static SUCCESS_COLOR;
        private static TRACE_COLOR;
        private debugConfig;
        private stormPlayer;
        private colorOrder;
        private monoColor;
        private logMemory;
        constructor(config: DebugConfig, stormLibrary: StormLibrary);
        info(objectName: any, message: string): void;
        warning(objectName: any, message: string): void;
        error(objectName: any, message: string): void;
        success(objectName: any, message: string): void;
        trace(objectName: any, message: string): void;
        private logData;
        private writeToContainer;
        getAllLogs(): Array<string>;
    }
}

declare namespace Storm {
    class AbstractSourceItem {
        protected type: ProtocolType;
        protected streamInfo: StreamInfo;
        constructor(type: ProtocolType, info: StreamInfo);
        getType(): ProtocolType;
        getStreamInfo(): StreamInfo;
    }
}

declare namespace Storm {
    class ClientUser {
        private readonly LOG_ACTIVITY;
        private main;
        private bandwidthCapabilities;
        private logger;
        constructor(main: StormLibrary);
        setBandwidthCapabilities(newCapabilities: number): void;
        getBandwidthCapabilities(): number;
    }
}

declare namespace Storm {
    class GatewayServerItem implements IServerItem {
        private host;
        private application;
        private port;
        private isSSL;
        private hasFaild;
        constructor(host: string, application: string, port?: number, isSSL?: boolean);
        getHost(): string;
        getPort(): number;
        getIfSSL(): boolean;
        getIfFaild(): boolean;
        setAsFaild(value: boolean): void;
        getApplication(): string;
        getData(): any;
        toString(): string;
    }
}

declare namespace Storm {
    interface IServerItem {
        getHost(): string;
        getApplication(): string;
        getPort(): number;
        getIfSSL(): boolean;
        getIfFaild(): boolean;
        setAsFaild(value: boolean): void;
        toString(): string;
    }
}

declare namespace Storm {
    interface ISourceItem {
        getType(): ProtocolType;
        getStreamInfo(): StreamInfo;
        toString(): string;
    }
}

declare namespace Storm {
    interface IStreamItem {
        getType(): ProtocolType;
        getStreamName(): string;
        toString(): string;
    }
}

declare namespace Storm {
    class MetaDataItem {
        private videoWidth;
        private videoHeight;
        private videoTimeScale;
        private variableFPS;
        private nominalFPS;
        private encoder;
        private audioCodec;
        private videoCodec;
        private audioChannels;
        private audioSampleRate;
        private audioSampleSize;
        private audioDataRate;
        MetaDataItem(): void;
        setVideoWidth(width: number): void;
        setVideoHeight(height: number): void;
        setIfVariableFPS(isVariableFPS: boolean): void;
        setEncoder(encoder: string): void;
        setAudioCodec(audioCodec: string): void;
        setVideoCodec(videoCodec: string): void;
        setAudioChannels(audioChannels: number): void;
        setAudioSampleRate(audioSampleRate: number): void;
        setAudioSampleSize(audioSampleSize: number): void;
        setAudioDataRate(audioDataRate: number): void;
        setVideoTimeScale(videoTimeScale: number): void;
        setNominalFPS(fps: number): void;
        getVideoWidth(): number;
        getVideoHeight(): number;
        isVariableFPS(): boolean;
        getNominalFPS(): number;
        getEncoder(): string;
        getAudioCodec(): string;
        getVideoCodec(): string;
        getAudioChannels(): number;
        getAudioSampleRate(): number;
        getAudioSampleSize(): number;
        getAudioDataRate(): number;
        getVideoTimeScale(): number;
        toString(): string;
    }
}

declare namespace Storm {
    class RTMPSourceItem extends AbstractSourceItem implements ISourceItem {
        private host;
        private application;
        private streamName;
        private port;
        private defaultSource;
        constructor(host: string, application: string, streamName: string, port: number, streamInfo: StreamInfo, defaultSource: boolean);
        getHost(): string;
        getPort(): number;
        getApplicationName(): string;
        getStreamName(): string;
        isDefaultSource(): boolean;
        toString(): string;
    }
}

declare namespace Storm {
    class StormServerItem implements IServerItem {
        private host;
        private port;
        private isSSL;
        private hasFaild;
        constructor(host: string, port?: number, isSSL?: boolean);
        getHost(): string;
        getPort(): number;
        getIfSSL(): boolean;
        getIfFaild(): boolean;
        setAsFaild(value: boolean): void;
        getApplication(): string;
        getData(): any;
        toString(): string;
    }
}

declare namespace Storm {
    class StormSourceItem extends AbstractSourceItem implements ISourceItem {
        private streamName;
        private applicationName;
        private defaultSource;
        constructor(streamName: string, applicationName: string, streamInfo: StreamInfo, defaultSource: boolean);
        getStreamName(): string;
        getApplicationName(): string;
        isDefaultSource(): boolean;
        toString(): string;
    }
}

declare namespace Storm {
    class StreamInfo {
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
}

declare namespace Storm {
    class WebRTCSourceItem extends AbstractSourceItem implements ISourceItem {
        private streamName;
        private defaultSource;
        constructor(streamName: string, streamInfo: StreamInfo, defaultSource: boolean);
        getStreamName(): string;
        isDefaultSource(): boolean;
        toString(): string;
    }
}

declare namespace Storm {
    class WebRTCStreamItem implements IStreamItem {
        private streamName;
        constructor(streamName: string);
        getStreamName(): string;
        getType(): ProtocolType;
    }
}

declare namespace Storm {
    class AbstractPlayer {
        protected main: StormLibrary;
        protected video: VideoContainer;
        protected sourceList: Array<ISourceItem>;
        protected playerState: PlayerState;
        protected restartTimer: any;
        protected broadcastTime: number;
        protected absoluteBroadcastTime: number;
        protected logger: Logger;
        protected selectedSource: RTMPSourceItem | StormSourceItem | WebRTCSourceItem;
        constructor(main: StormLibrary, video: VideoContainer);
        start(): void;
        play(): void;
        pause(): void;
        onVideoPlay(): void;
        onVideoPause(): void;
        onVideoStop(): void;
        onVideoMetadata(event: any): void;
        pickBestSource(sourceList: Array<ISourceItem>, protocolTypes: Array<ProtocolType>): ISourceItem;
        seek(time: number): boolean;
        protected ifRequireInteraction(): boolean;
        isPlaying(): boolean;
        getPlaybackStatus(): string;
        selectSource(sourceItem: any): void;
        restart(): void;
        getCurrentQuality(): string;
        getPlayerState(): PlayerState;
        getCurrentSource(): any;
        destroy(): void;
    }
}

declare namespace Storm {
    class AbstractSocket {
        protected socket: WebSocket;
        protected socketURL: string;
        protected serverData: IServerItem;
        protected serverList: Array<IServerItem>;
        protected connectionState: ConnectionState;
        protected messageCount: number;
        protected messageTotalSize: number;
        protected reconnectTimer: any;
        constructor();
        protected startSocket(socketURL: string, isBinary?: boolean): void;
        startConnection(): void;
        protected createSocket(serverData: IServerItem): void;
        protected onSocketOpen(event: any): void;
        protected onSocketClose(event: any): void;
        protected onSocketMessage(event: any): void;
        protected onSocketError(event: any): void;
        protected onAllServersError(): void;
        sendData(data: any): void;
        protected restartConnection(timeOut: number): void;
        getConnectionState(): ConnectionState;
        protected destroy(): void;
        getSocketURL(): string;
        getServerData(): IServerItem;
    }
}

declare namespace Storm {
    class GatewayConnection extends AbstractSocket {
        private readonly LOG_ACTIVITY;
        private main;
        private logger;
        private acquiredServerList;
        private acquiredSourceList;
        private isComplete;
        constructor(main: StormLibrary);
        protected createSocket(serverData: IServerItem): void;
        protected onSocketOpen(event: any): void;
        protected onSocketClose(event: any): void;
        protected onSocketMessage(event: any): void;
        protected onSocketError(event: any): void;
        protected onAllServersError(): void;
        destroy(): void;
    }
}

declare namespace Storm {
    class HLSConnection extends AbstractSocket {
        private readonly LOG_ACTIVITY;
        private main;
        private player;
        private logger;
        private videoSource;
        private seekStart;
        private lastTimestamp;
        constructor(main: StormLibrary, player: HLSPlayer);
        protected createSocket(serverData: IServerItem): void;
        startHLSConnection(videoSource: RTMPSourceItem | StormSourceItem): void;
        protected onSocketOpen(event: any): void;
        protected onSocketClose(event: any): void;
        protected onSocketMessage(event: any): void;
        protected onSocketError(event: any): void;
        protected onAllServersError(): void;
        destroy(): void;
    }
}

declare namespace Storm {
    class HLSPlayer extends AbstractPlayer implements IPlayer {
        private readonly LOG_ACTIVITY;
        private connection;
        private seekTime;
        private dummyRestart;
        private metaData;
        private restartOnResume;
        private m3u8URL;
        constructor(main: StormLibrary, video: VideoContainer);
        start(): void;
        play(): void;
        pause(): void;
        togglePlay(): void;
        onVideoMetadata(event: any): void;
        onTimeUpdate(event: any): void;
        onConnectionStart(): void;
        stop(): void;
        getTime(): number;
        getAbsoluteTime(): number;
        onVideoPlay(): void;
        onVideoPause(): void;
        onSocketMessage(event: any): void;
        private processEvent;
        onSocketError(shouldReconnect: boolean, reconnectTime: number): void;
        onAllServersFailed(): void;
        onVolumeChange(event: any): void;
        getVideoContainer(): VideoContainer;
        pickBestSource(sourceList: Array<ISourceItem>, protocolTypes: Array<ProtocolType>): StormSourceItem | RTMPSourceItem;
        setQuality(sourceName: string): boolean;
        seek(time: number): boolean;
        addStreamSource(sourceItem: any, addAndPlay: boolean): boolean;
        restart(): void;
        destroy(): void;
    }
}

declare namespace Storm {
    interface IPlayer {
        start(): void;
        stop(): void;
        destroy(): void;
        restart(): void;
        play(): void;
        pause(): void;
        togglePlay(): void;
        onVideoPlay(): void;
        onVideoPause(): void;
        onVideoStop(): void;
        seek(time: number): boolean;
        getTime(): number;
        getAbsoluteTime(): number;
        isPlaying(): boolean;
        getPlaybackStatus(): string;
        getCurrentSource(): any;
        addStreamSource(sourceItem: any, addAndPlay: boolean): boolean;
        setQuality(sourName: string): boolean;
        getCurrentQuality(): string;
        onVolumeChange(event: any): void;
        onVideoMetadata(event: any): void;
        getVideoContainer(): VideoContainer;
    }
}

declare namespace Storm {
    interface IWebRTC {
        onSocketOpen(event: any): void;
        onSocketClose(event: any): void;
        onSocketMessage(event: any): void;
        onSocketError(event: any, shouldReconnect: boolean, reconnectTime: number): void;
        onAllServersFailed(): void;
    }
}

declare namespace Storm {
    class MSEBuffer {
        private position;
        private frameRate;
        private dataArray;
        private bufferState;
        constructor(frameRate: number);
        push(item: any): void;
        head(): any;
        getSize(): number;
        getBufferState(): BufferState;
        setBufferState(newState: BufferState): void;
    }
}

declare namespace Storm {
    class MSEConnection extends AbstractSocket {
        private readonly LOG_ACTIVITY;
        private main;
        private player;
        private logger;
        private videoSource;
        private seekStart;
        private lastTimestamp;
        constructor(main: StormLibrary, player: MSEPlayer);
        protected createSocket(serverData: IServerItem): void;
        startMSEConnection(videoSource: RTMPSourceItem | StormSourceItem): void;
        protected onSocketOpen(event: any): void;
        protected onSocketClose(event: any): void;
        protected onSocketMessage(event: any): void;
        protected onSocketError(event: any): void;
        protected onAllServersError(): void;
        destroy(): void;
    }
}

declare namespace Storm {
    class MSEPlayer extends AbstractPlayer implements IPlayer {
        private readonly LOG_ACTIVITY;
        private connection;
        private mediaSource;
        private segmentsQueue;
        private commandQueue;
        private seekTime;
        private videoBuffer;
        private sourceBuffer;
        private bufferUpdateGuard;
        private dummyRestart;
        private metaData;
        private restartOnResume;
        constructor(main: StormLibrary, video: VideoContainer);
        start(): void;
        play(): void;
        pause(): void;
        togglePlay(): void;
        onVideoMetadata(event: any): void;
        onTimeUpdate(event: any): void;
        onConnectionStart(): void;
        stop(): void;
        getTime(): number;
        getAbsoluteTime(): number;
        onVideoPlay(): void;
        onVideoPause(): void;
        onSourceOpen(): void;
        onSocketMessage(event: any): void;
        onBufferUpdated(): void;
        private processEvent;
        onSocketError(shouldReconnect: boolean, reconnectTime: number): void;
        onAllServersFailed(): void;
        onVolumeChange(event: any): void;
        getVideoContainer(): VideoContainer;
        pickBestSource(sourceList: Array<ISourceItem>, protocolTypes: Array<ProtocolType>): StormSourceItem | RTMPSourceItem;
        setQuality(sourceName: string): boolean;
        seek(time: number): boolean;
        addStreamSource(sourceItem: any, addAndPlay: boolean): boolean;
        restart(): void;
        destroy(): void;
    }
}

declare namespace Storm {
    class MungeSDP {
        private SDPOutput;
        private videoChoice;
        private audioChoice;
        private videoIndex;
        private audioIndex;
        constructor();
        mungeSDPPlay(sdpStr: string): string;
        mungeSDPPublish(sdpStr: string, mungeData: any): string;
        addAudio(sdpStr: string, audioLine: string): string;
        addVideo(sdpStr: string, videoLine: string): string;
        deliverCheckLine(profile: any, type: string): string;
        checkLine(line: any): boolean;
        getrtpMapID(line: any): any;
    }
}

declare namespace Storm {
    class VideoContainer {
        containerID: string;
        private videoObject;
        private videoContainer;
        private containerWidth;
        private containerHeight;
        private scalingMode;
        private videoWidth;
        private videoHeight;
        private player;
        private hasMetadata;
        private main;
        private logger;
        private forceMute;
        private alreadyPlayed;
        private savedVolume;
        constructor(main: StormLibrary);
        initialize(): void;
        attachPlayer(player: IPlayer): void;
        detachPlayer(): void;
        private attachEvents;
        dispatchVolumeEvent(): void;
        mute(): void;
        unmute(): void;
        setVolume(newVolume: number): void;
        getVolume(): number;
        getVideoObject(): HTMLVideoElement;
        destroy(): void;
        setSize(width: number, height: number): void;
        setWidth(width: number): void;
        setHeight(height: number): void;
        setScalingMode(newMode: string): void;
        private scaleVideo;
        makeScreenshot(): any;
    }
}

declare namespace Storm {
    class WebRTCConnection extends AbstractSocket {
        private readonly LOG_ACTIVITY;
        private main;
        private player;
        private logger;
        constructor(main: StormLibrary, player: IWebRTC);
        protected createSocket(serverData: StormServerItem): void;
        protected onSocketOpen(event: any): void;
        protected onSocketClose(event: any): void;
        protected onSocketMessage(event: any): void;
        protected onSocketError(event: any): void;
        protected onAllServersError(): void;
        destroy(): void;
    }
}

declare namespace Storm {
    class WebRTCPlayer extends AbstractPlayer implements IPlayer, IWebRTC {
        private readonly LOG_ACTIVITY;
        private mungeSDP;
        private peerConnection;
        private peerConnectionConfig;
        private connection;
        private streamTimeout;
        private streamInfo;
        private userData;
        private lastTimestamp;
        private lastCheckedTimestamp;
        private flowCheckInterval;
        constructor(main: StormLibrary, video: VideoContainer);
        addStreamSource(sourceItem: any, addAndPlay: boolean): boolean;
        setQuality(sourName: string): boolean;
        start(): void;
        stop(): void;
        onSocketOpen(event: any): void;
        onVideoPlay(): void;
        onVideoPause(): void;
        onVideoLoad(): void;
        onVideoStop(): void;
        onVideoMetadata(event: any): void;
        onTimeUpdate(event: any): void;
        onVolumeChange(event: any): void;
        onSocketMessage(event: any): void;
        onOKStatus(msgJSON: any): void;
        onWebRTCError(error: any, thisRef: WebRTCPlayer): void;
        onSocketClose(event: any): void;
        onSocketError(event: any, shouldReconnect: boolean, reconnectTime: number): void;
        onAllServersFailed(): void;
        private onIceCandidate;
        private onRemoteTrack;
        private onConnectionStateChange;
        private sendPlayGetOffer;
        private onDescription;
        private onPeerConnectionError;
        onConnectionTimeout(): void;
        getVideoContainer(): VideoContainer;
        restart(): void;
        destroy(): void;
        togglePlay(): void;
        getAbsoluteTime(): number;
        getTime(): number;
    }
}

declare namespace Storm {
    class StorageManager extends CookieManager {
        private readonly LOG_ACTIVITY;
        private readonly DAYS_TILL_EXPIRE;
        private prefix;
        private isEnabled;
        private logger;
        private main;
        constructor(main: StormLibrary);
        saveField(name: string, value: string): void;
        getField(name: string): string | null;
        deleteField(name: string): void;
        protected onCookieError(error: any): void;
    }
}

declare namespace Storm {
    class SoundMeter {
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
}

declare namespace Storm {
    class StreamConstraint {
        private originalConstraint;
        constructor(originalConstraint: any);
    }
}

declare namespace Storm {
    class WebRTCStreamer implements IPlayer, IWebRTC {
        private readonly LOG_ACTIVITY;
        private main;
        private video;
        private mungeSDP;
        private soundMeter;
        private peerConnection;
        private peerConnectionConfig;
        private connection;
        private selectedCamera;
        private selectedMicrophone;
        private isMicrophoneMuted;
        private cameraList;
        private microphoneList;
        private stream;
        private isPublishing;
        private constraints;
        private streamInfo;
        private userData;
        protected streamerState: PlayerState;
        private logger;
        private failedAttemps;
        private lastTimestamp;
        private lastCheckedTimestamp;
        private flowCheckInterval;
        private noTimestampProgress;
        constructor(main: StormLibrary, video: VideoContainer);
        seek(time: number): boolean;
        getCurrentQuality(): string;
        addSource(sourceItem: any, addAndPlay: boolean): boolean;
        setQuality(sourName: string): boolean;
        getCurrentSource(): void;
        togglePlay(): void;
        start(): void;
        onStreamPublished(): void;
        onStreamUnpublished(): void;
        onStreamNameInUse(): void;
        onSocketOpen(event: any): void;
        private onConnectionStateChange;
        private onDescriptionSuccess;
        private onDescriptionError;
        onSocketClose(event: any): void;
        onSocketMessage(event: any): void;
        onSocketError(event: any, shouldReconnect: boolean, reconnectTime: number): void;
        onAllServersFailed(): void;
        private onIceCandidate;
        private onUserMediaSuccess;
        onUserMediaError(error: any): void;
        onWebRTCError(error: any, self: WebRTCStreamer): void;
        getDevices(): any;
        onVideoPlay(): void;
        onVideoPause(): void;
        onVideoStop(): void;
        onVolumeChange(event: any): void;
        onVideoMetadata(event: any): void;
        onTimeUpdate(event: any): void;
        selectCamera(deviceID: string): void;
        selectMicrophone(deviceID: string): void;
        muteMicrophone(microphoneState: boolean): void;
        getIfMicrophoneMuted(): boolean;
        toggleCamera(): void;
        private closeStream;
        onSoundMeter(high: number, low: number): void;
        private ifRequireInteraction;
        getStreamerState(): PlayerState;
        getVideoContainer(): VideoContainer;
        restart(): void;
        stop(): void;
        destroy(): void;
        getPlaybackStatus(): string;
        isPlaying(): boolean;
        pause(): void;
        play(): void;
        selectSource(sourceItem: any): void;
        addStreamSource(sourceItem: any, addAndPlay: boolean): boolean;
        getAbsoluteTime(): number;
        getTime(): number;
    }
}

import VideoContainer = Storm.VideoContainer;
import WebRTCStreamer = Storm.WebRTCStreamer;
import ConnectionType = Storm.ConnectionType;
import GatewayConnection = Storm.GatewayConnection;
declare class StormLibrary extends Storm.EventDispatcher {
    private readonly PLAYER_VERSION;
    private readonly COMPILE_DATE;
    private readonly PLAYER_BRANCH;
    private readonly PLAYER_PROTOCOL_VERSION;
    private config;
    private playerID;
    private initialized;
    private logger;
    private storageManager;
    private videoContainer;
    internalPlayer: Storm.IPlayer;
    internalStreamer: WebRTCStreamer;
    private gatewayConnection;
    private clientUser;
    private settings;
    constructor(settings: any);
    initialize(): void;
    private startPlayer;
    addEventListener(eventName: string, callback: any, thisRef?: any, priority?: number, logMessage?: string): boolean;
    removeEventListener(eventName: string, callback: any): boolean;
    getPlayerID(): number;
    getConfig(): Storm.ConfigManager;
    getClientUser(): Storm.ClientUser;
    getRole(): string;
    getVersion(): string;
    getPlayerBranch(): string;
    stop(): void;
    play(): void;
    pause(): void;
    togglePlay(): void;
    seek(newPoint: number): boolean;
    isPlaying(): boolean;
    getPlaybackStatus(): string;
    mute(): void;
    unmute(): void;
    isMute(): boolean;
    setVolume(newVolume: number): void;
    getVolume(): number | undefined;
    toggleMute(): void;
    setSize(width: number, height: number): void;
    setWidth(width: number): void;
    setHeight(height: number): void;
    makeScreenshot(): string;
    setCamera(deviceID: string | boolean): void;
    setMicrophone(deviceID: string | boolean): void;
    isMicrophoneMuted(): any;
    toggleCamera(): void;
    setScalingMode(newMode: string): void;
    restart(): void;
    getCurrentSource(): any;
    getAllSources(): any;
    getAvailableQualities(): any;
    setQuality(sourceName: string): boolean;
    getCurrentQuality(): string;
    addStreamSource(sourceItem: any, addAndPlay: boolean): boolean;
    getAbsoluteStreamTime(): number;
    getLogger(): Storm.Logger;
    getSettingsAsJSON(): string;
    getSettings(): any;
    getPlayerProtocolVersion(): number;
    destroy(): void;
}
declare const stormPlayerCollection: Array<StormLibrary>;
