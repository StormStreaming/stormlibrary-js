import { AbstractSourceItem } from "./AbstractSourceItem";
import { ISourceItem } from "./ISourceItem";
import { StreamInfo } from "./StreamInfo";
export declare class StormSourceItem extends AbstractSourceItem implements ISourceItem {
    private streamName;
    private applicationName;
    private defaultSource;
    constructor(streamName: string, applicationName: string, streamInfo: StreamInfo, defaultSource: boolean);
    getStreamName(): string;
    getApplicationName(): string;
    isDefaultSource(): boolean;
    toString(): string;
}
