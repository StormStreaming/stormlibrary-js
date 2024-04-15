export declare class ServerInfo {
    private name;
    private groupName;
    private protocolVer;
    private serverInitTime;
    private version;
    constructor(name: string, groupName: string, protocolVer: number, serverInitTime: number, version: string);
    getName(): string;
    getGroup(): string;
    getProtocolVersion(): number;
    getServerInitTime(): number;
    getVersion(): string;
}
