export interface ServerHandshakePacket {
    branch: string;
    group: string;
    license: string;
    name: string;
    protocolVer: number;
    serverTime: number;
    version: string;
}
export interface AppDataPacket {
    name: string;
    tokenRequired: boolean;
    dvrEnabled: boolean;
    type: string;
}
export interface AppAuthPacket {
    command: string;
    token: boolean;
    userAgent: boolean;
    uniq: string;
}
export interface AuthResultPacket {
    answer: string;
    reason?: string;
}
export interface PlayRequestPacket {
    protocol: string;
    streamKey: string;
    extApplication?: string;
    extPort?: number;
    extHost?: string;
    startTime: number;
    packetizer: string;
}
export interface PlayResultPacket {
    reason?: string;
    status: string;
    streamState?: string;
    streamKey: string;
}
export interface PlaybackMetadataPacket {
    audioCodecID: number;
    audioDataRate: number;
    audioSampleRate: number;
    audioSampleSize: number;
    encoder: string;
    frameRate?: number;
    constFrameRate: boolean;
    videoHeight: number;
    videoWidth: number;
    videoCodecID: number;
    videoDataRate: number;
    width: number;
    audioChannels: number;
}
export interface PlaybackStopPacket {
    newState: string;
}
export interface PlaybackLinkingPacket {
    path: string;
}
export interface SubscriptionRequestPacket {
    streamKey: string;
}
export interface LatencyReportPacket {
    streamKey: string;
    latency: number;
}
export interface SubscriptionResultPacket {
    reason?: string;
    status: string;
    streamState: string;
    optParameters: any;
    streamList?: any;
    streamKey: string;
}
export interface SubscriptionUpdatePacket {
    streamKey: string;
    streamState: string;
    streamList?: any;
}
export interface PlaybackProgressPacket {
    streamDuration: number;
    streamStartTime: number;
    playbackStartTime: number;
    playbackDuration: number;
    dvrCacheSize: number;
}
