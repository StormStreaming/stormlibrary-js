import { AbstractSourceItem } from "./AbstractSourceItem";
import { ISourceItem } from "./ISourceItem";
import { StreamInfo } from "./StreamInfo";
export declare class WebRTCSourceItem extends AbstractSourceItem implements ISourceItem {
    private streamName;
    private defaultSource;
    constructor(streamName: string, streamInfo: StreamInfo, defaultSource: boolean);
    getStreamName(): string;
    isDefaultSource(): boolean;
    toString(): string;
}
