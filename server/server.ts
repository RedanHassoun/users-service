import { AppUtils } from './../common/app-utils';
import express = require('express');
import bodyParser = require('body-parser');
import * as http from 'http';
import { inject } from 'inversify';
import { globalResponseHandler } from '../middlewares/response-handler';
import { TYPES } from '../types';
import { AppRoute } from '../interfaces/app-route';
import { AppDBConnection } from '../interfaces/app-db-connection';
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

export class UsersManagementApp {
    private app: express.Express;
    private server: http.Server;
    private readonly DB_CONNECTION_RETRY_DELAY_MILLIS = 5000;

    constructor(@inject(TYPES.AppRoute) private usersApi: AppRoute, 
                @inject(TYPES.AppDBConnection) private dBConnection: AppDBConnection) {
        this.app = express();
        this.app.use(bodyParser.json());
    }

    public start(): void {
        this.initRoutes();
        this.handleAllResponses();
        this.initDB();
        this.initDocumentation();
        this.listenToRequests();
    }

    private initRoutes(): void {
        this.app.use(this.usersApi.getRouter());
    }

    private initDocumentation(): void {
        const port = process.env.APP_PORT;
        const swaggerOptions = {
            swaggerDefinition: {
                info: {
                    title: 'Users service',
                    description: 'A service to manage users',
                    version: '1.0.0'
                },
                servers: [`http://localhost:${port}`]
            },
            apis: ['./routes/*.*']
        };
        const docs = swaggerJSDoc(swaggerOptions);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));
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

    private handleAllResponses(): void {
        this.app.use(globalResponseHandler);
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