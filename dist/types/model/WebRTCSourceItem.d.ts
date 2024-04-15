import { AbstractSourceItem } from "./AbstractSourceItem";
import { ISourceItem } from "./ISourceItem";
import { StreamInfo } from "./StreamInfo";
export declare class WebRTCSourceItem extends AbstractSourceItem implements ISourceItem {
    private streamKey;
    private defaultSource;
    constructor(streamKey: string, streamInfo: StreamInfo, defaultSource: boolean);
    getStreamKey(): string;
    isDefaultSource(): boolean;
    toString(): string;
}
