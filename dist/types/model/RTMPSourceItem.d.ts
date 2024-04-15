import { AbstractSourceItem } from "./AbstractSourceItem";
import { ISourceItem } from "./ISourceItem";
import { StreamInfo } from "./StreamInfo";
export declare class RTMPSourceItem extends AbstractSourceItem implements ISourceItem {
    private host;
    private application;
    private streamKey;
    private port;
    private defaultSource;
    constructor(host: string, application: string, streamKey: string, port: number, streamInfo: StreamInfo, defaultSource: boolean);
    getHost(): string;
    getPort(): number;
    getApplicationName(): string;
    getStreamKey(): string;
    isDefaultSource(): boolean;
    toString(): string;
}
