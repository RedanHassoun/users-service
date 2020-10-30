import { AppUtils } from './app-utils';
import { injectable } from "inversify";

@injectable ()
export class Logger {

    constructor(){
    }
    
    public info(message: string): void {
        const date = new Date();
        console.log(`${date.toLocaleString()}  [INFO]  ${message}`);
    }

    public error(message: string, err: Error): void {
        const date = new Date();
        const fullError = err ? `\n${AppUtils.getFullException(err)}` : '';
        console.log(`${date.toLocaleString()}  [ERROR]  ${message}${fullError}`);
    } 
}
