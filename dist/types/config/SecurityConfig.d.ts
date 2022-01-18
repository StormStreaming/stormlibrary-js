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
    setSecurityMethod(newValue: string): void;
    getToken(): string;
    setToken(newValue: string): void;
    print(logger: Logger, force?: boolean): void;
}
