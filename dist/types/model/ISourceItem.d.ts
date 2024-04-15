import { ProtocolType } from "../config/enum/ProtocolType";
import { StreamInfo } from "./StreamInfo";
export interface ISourceItem {
    getType(): ProtocolType;
    getStreamInfo(): StreamInfo;
    getStreamKey(): string;
    toString(): string;
}
