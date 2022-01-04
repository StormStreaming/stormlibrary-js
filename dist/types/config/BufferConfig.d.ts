import { IConfig } from "./IConfig";
import { Logger } from "../logger/Logger";
export declare class BufferConfig implements IConfig {
    private readonly PRINT_ON_STARTUP;
    private bufferConfig;
    private minValue;
    private maxValue;
    private startValue;
    private targetValue;
    constructor(bufferConfig: any);
    parse(bufferConfig: any): void;
    getMinValue(): number;
    getMaxValue(): number;
    getStartValue(): number;
    getTargetValue(): number;
    setConfig(config: any): void;
    print(logger: Logger, force?: boolean): void;
}
