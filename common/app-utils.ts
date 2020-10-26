export class AppUtils {
    public static hasValue(obj: any) {
        if (typeof obj === 'undefined' || obj === null) {
            return false;
        }
        return true;
    }
}