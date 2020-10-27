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

    constructor(@inject(UsersApi) private usersApi: UsersApi, 
                @inject(AppDBConnection) private dBConnection: AppDBConnection) {
        this.app = express();
        this.app.use(bodyParser.json());
    }

    public start(): void {
        this.initRoutes();
        this.listenToRequests();
        this.initErrorHandler();
        // this.initDB(); TODO: connect to DB
    }

    private initRoutes(): void {
        this.app.use(this.usersApi.getRouter());
    }

    private initDB(): void {
        this.dBConnection.connect()
            .then(res => console.log('connected to DB'))
            .catch(err => {
                console.error(`Cannot connect to DB, ${AppUtils.getFullException(err)}`);
                throw err;
            });
    }

    private initErrorHandler(): void {
        this.app.use(globalErrorHandler);
    }

    private listenToRequests(): void {
        this.server = this.app.listen(3000, () => { // TODO: use config for port
            console.log(`Listening for port: 3000`);
        });
    }
}