import { ProtocolType } from "../config/enum/ProtocolType";
import { StreamInfo } from "./StreamInfo";
export declare class AbstractSourceItem {
    protected type: ProtocolType;
    protected streamInfo: StreamInfo;
    constructor(type: ProtocolType, info: StreamInfo);
    getType(): ProtocolType;
    getStreamInfo(): StreamInfo;
}
