import { IServerItem } from "./IServerItem";
export declare class GatewayServerItem implements IServerItem {
    private host;
    private application;
    private port;
    private isSSL;
    private hasFaild;
    constructor(host: string, application: string, port?: number, isSSL?: boolean);
    getHost(): string;
    getPort(): number;
    getIfSSL(): boolean;
    getIfFaild(): boolean;
    setAsFaild(value: boolean): void;
    getApplication(): string;
    getData(): any;
    toString(): string;
}
