export class AppUtils {
    public static hasValue(obj: any) {
        if (typeof obj === 'undefined' || obj === null) {
            return false;
        }
        return true;
    }

    public static getFullException(err: Error) {
        if (!err) return '';
        return `${err.message}, stack: ${err.stack}`;
    }
}