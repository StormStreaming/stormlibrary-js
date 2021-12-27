export declare class MungeSDP {
    private SDPOutput;
    private videoChoice;
    private audioChoice;
    private videoIndex;
    private audioIndex;
    constructor();
    mungeSDPPlay(sdpStr: string): string;
    mungeSDPPublish(sdpStr: string, mungeData: any): string;
    addAudio(sdpStr: string, audioLine: string): string;
    addVideo(sdpStr: string, videoLine: string): string;
    deliverCheckLine(profile: any, type: string): string;
    checkLine(line: any): boolean;
    getrtpMapID(line: any): any;
}
