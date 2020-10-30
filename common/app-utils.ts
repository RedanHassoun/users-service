export class AppUtils {
    public static hasValue(obj: any): boolean {
        if (typeof obj === 'undefined' || obj === null) {
            return false;
        }
        return true;
    }

    public static getFullException(err: Error): string {
        if (!err) return '';
        return `${err.message}, stack: ${err.stack}`;
    }

    public static isInteger(obj: any): boolean {
        if (!AppUtils.hasValue(obj)) {
            return false;
        }
        if (!isNaN(obj) && Number.isInteger(obj)) {
            return true;
        }
        return false;
    }
}
