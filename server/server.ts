import { AppUtils } from './../common/app-utils';
import express = require('express');
import bodyParser = require('body-parser');
import { UsersApi } from '../routes/users.api';
import * as http from 'http';
import { inject } from 'inversify';
import { globalErrorHandler } from '../middlewares/error-handler';
import { AppDBConnection } from '../repositories/app-db-connection';

export class UsersManagementApp {
    private app: express.Express;
    private server: http.Server;
    private readonly DB_CONNECTION_RETRY_DELAY_MILLIS = 5000;

    constructor(@inject(UsersApi) private usersApi: UsersApi, 
                @inject(AppDBConnection) private dBConnection: AppDBConnection) {
        this.app = express();
        this.app.use(bodyParser.json());
    }

    public start(): void {
        this.initRoutes();
        this.listenToRequests();
        this.initErrorHandler();
        this.initDB();
    }

    private initRoutes(): void {
        this.app.use(this.usersApi.getRouter());
    }

    private async initDB(): Promise<void> {
        let retryNum = 5;
        while(retryNum > 0) {
            try {
                console.log('Connecting to db...');
                await this.dBConnection.connect(); 
                console.log('Connected to db.');
                break;
            } catch(err) {
                console.error(
                    `Cannot connect to db, ${err.message}, retrying in: ${this.DB_CONNECTION_RETRY_DELAY_MILLIS} milliseconds`);
                retryNum--;
                await new Promise(res => setTimeout(res, this.DB_CONNECTION_RETRY_DELAY_MILLIS));
            }
        }
    }

    private initErrorHandler(): void {
        this.app.use(globalErrorHandler);
    }

    private listenToRequests(): void {
        if (!AppUtils.hasValue(process.env.APP_PORT)) {
            throw new Error('Cannot start server, the APP_PORT must be defined as an environment variable');
        }
        this.server = this.app.listen(process.env.APP_PORT, () => {
            console.log(`Listening for port: ${process.env.APP_PORT}`);
        });
    }
}