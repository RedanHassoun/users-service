import express = require('express');
import bodyParser = require('body-parser');
import { UsersApi } from '../routes/users.api';
import * as http from 'http';
import { inject } from 'inversify';

export class UsersManagementApp {
    private app: express.Express;
    private server: http.Server;

    constructor(@inject(UsersApi) private usersApi: UsersApi) {
        this.app = express();
        this.app.use(bodyParser.json());
    }

    public start(): void {
        this.initRoutes();
        this.listenToRequests();
    }

    private initRoutes(): void {
        this.app.use(this.usersApi.getRouter());
    }

    private listenToRequests(): void {
        this.server = this.app.listen(3000, () => { // TODO: use config for port
            console.log(`Listening for port: 3000`);
        });
    }
}