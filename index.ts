import "reflect-metadata";
import { UsersManagementApp } from './server/server';
import container from "./inversify.config";
import { TYPES } from "./types";

const app = new UsersManagementApp(container.get(TYPES.AppRoute), container.get(TYPES.AppDBConnection));

app.start();

console.log(`--- USERS MANAGEMENT SERVICE ---`);
