import { InputDevice } from "./InputDevice";
export declare class InputDeviceList {
    private internalList;
    constructor();
    push(item: InputDevice): number;
    get(id: number): InputDevice;
    getSize(): number;
    getArray(): Array<InputDevice>;
}
