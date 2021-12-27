import { InputDevice } from "./InputDevice";
export declare class WebRTCConstraint {
    private isCameraEnabled;
    private isMicrophoneEnabled;
    private attachedCamera;
    private attachedMicrophone;
    private width;
    private height;
    private fps;
    constructor();
    setCameraStatus(newStatus: boolean): void;
    setMicrophoneStatus(newStatus: boolean): void;
    attachCamera(device: InputDevice): void;
    attachMicrophone(device: InputDevice): void;
    setFPS(newValue: number): void;
    createConstraint(): any;
}
