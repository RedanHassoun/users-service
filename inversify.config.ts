import { DtoMapper } from './common/dto-mapper';
import { Logger } from './common/logger';
import { Container } from "inversify"
import { UsersApi } from "./routes/users.api";
import { UsersController } from "./controllers/users-controller";
import { UsersRepository } from "./repositories/users-repository";
import { UsersService } from "./services/users-service";
import { AppDBConnection } from "./repositories/app-db-connection";

const container = new Container({ defaultScope: 'Singleton' });

container.bind<UsersApi>(UsersApi).toSelf();
container.bind<UsersController>(UsersController).toSelf();
container.bind<UsersRepository>(UsersRepository).toSelf();
container.bind<UsersService>(UsersService).toSelf();
container.bind<AppDBConnection>(AppDBConnection).toSelf();
container.bind<Logger>(Logger).toSelf();
container.bind<DtoMapper>(DtoMapper).toSelf();

export default container;
