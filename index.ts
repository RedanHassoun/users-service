import "reflect-metadata";
import { UsersApi } from './routes/users.api';
import { UsersManagementApp } from './server/server';
import { AppDBConnection } from "./repositories/app-db-connection";
import container from "./inversify.config";

const app = new UsersManagementApp(container.get(UsersApi), container.get(AppDBConnection));

app.start();

console.log(`--- USERS MANAGEMENT SERVICE ---`);
