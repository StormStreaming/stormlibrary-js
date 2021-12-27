import { IConfig } from "./IConfig";
import { SecurityType } from "./enum/SecurityType";
import { Logger } from "../logger/Logger";
export declare class SecurityConfig implements IConfig {
    private readonly PRINT_ON_STARTUP;
    private securityMethod;
    private token;
    constructor(config: any);
    parse(config: any): void;
    setConfig(config: any): void;
    getSecurityMethod(): SecurityType;
    getToken(): string;
    print(logger: Logger, force?: boolean): void;
}
