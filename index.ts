import { UsersApi } from './routes/users.api';
import { IOCContainerConfig } from "./inversify.config";
import { UsersManagementApp } from './server/server';

const IOCContainer = IOCContainerConfig.getContainer();

const app = new UsersManagementApp(IOCContainer.get(UsersApi));

app.start();

console.log(`--- USERS MANAGEMENT SERVICE ---`);
