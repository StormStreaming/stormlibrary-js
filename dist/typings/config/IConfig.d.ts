import { Logger } from "../logger/Logger";
export interface IConfig {
    parse(config: any): void;
    setConfig(config: any): void;
    print(logger: Logger, force: boolean): void;
}
