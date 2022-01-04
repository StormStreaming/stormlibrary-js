import { AbstractSourceItem } from "./AbstractSourceItem";
import { ISourceItem } from "./ISourceItem";
import { StreamInfo } from "./StreamInfo";
export declare class RTMPSourceItem extends AbstractSourceItem implements ISourceItem {
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
