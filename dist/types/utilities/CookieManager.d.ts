export declare class CookieManager {
    protected setCookie(name: string, value: string, daysToExpire: number): boolean;
    protected getCookie(name: string): any;
    protected deleteCookie(name: string): boolean;
    protected onCookieError(error: any): void;
}
