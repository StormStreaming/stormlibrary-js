export interface IWebRTC {
    onSocketOpen(event: any): void;
    onSocketClose(event: any): void;
    onSocketMessage(event: any): void;
    onSocketError(event: any, shouldReconnect: boolean, reconnectTime: number): void;
    onAllServersFailed(): void;
}
