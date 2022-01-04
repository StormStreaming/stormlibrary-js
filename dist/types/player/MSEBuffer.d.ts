import { BufferState } from "./enum/BufferState";
export declare class MSEBuffer {
    private position;
    private dataArray;
    private bufferState;
    constructor();
    push(item: any): void;
    head(): any;
    getSize(): number;
    getBufferState(): BufferState;
    setBufferState(newState: BufferState): void;
}
