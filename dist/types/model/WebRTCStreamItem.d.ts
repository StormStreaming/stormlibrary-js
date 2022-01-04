import { IStreamItem } from "./IStreamItem";
import { ProtocolType } from "../config/enum/ProtocolType";
export declare class WebRTCStreamItem implements IStreamItem {
    private streamName;
    private applicationName;
    private host;
    constructor(streamName: string, applicationName: string, host: string);
    getStreamName(): string;
    getApplicationName(): string;
    getHost(): string;
    getType(): ProtocolType;
}
