import { CookieManager } from "../utilities/CookieManager";
import { StormLibrary } from "../StormLibrary";
export declare class StorageManager extends CookieManager {
    private readonly LOG_ACTIVITY;
    private readonly DAYS_TILL_EXPIRE;
    private prefix;
    private isEnabled;
    private logger;
    constructor(main: StormLibrary);
    saveField(name: string, value: string): void;
    getField(name: string): string | null;
    deleteField(name: string): void;
    protected onCookieError(error: any): void;
}
