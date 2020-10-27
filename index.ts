import "reflect-metadata";
import { UsersApi } from './routes/users.api';
import { IOCContainerConfig } from "./inversify.config";
import { UsersManagementApp } from './server/server';
import { AppDBConnection } from "./repositories/app-db-connection";

const IOCContainer = IOCContainerConfig.getContainer();

const app = new UsersManagementApp(IOCContainer.get(UsersApi), IOCContainer.get(AppDBConnection));

app.start();

console.log(`--- USERS MANAGEMENT SERVICE ---`);
