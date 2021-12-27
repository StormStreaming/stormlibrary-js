import { ProtocolType } from "../config/enum/ProtocolType";
export interface IStreamItem {
    getType(): ProtocolType;
    getStreamName(): string;
    getHost(): string;
    getApplicationName(): string;
    toString(): string;
}
