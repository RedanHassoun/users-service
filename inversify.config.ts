import { UsersService } from './interfaces/users-service';
import { DtoMapperImpl } from './common/dto-mapper';
import { Logger } from './common/logger';
import { Container } from "inversify"
import { UsersApi } from "./routes/users.api";
import { UsersController } from "./controllers/users-controller";
import { UsersRepositoryImpl } from "./repositories/users-repository";
import { UsersServiceImpl } from "./services/users-service-impl";
import { AppDBConnectionImpl } from "./repositories/app-db-connection";
import { PasswordManagerServiceImpl } from './services/password-manager-service';
import { AppRoute } from './interfaces/app-route';
import { UsersRepository } from './interfaces/users-repository';
import { TYPES } from './types';
import { AppDBConnection } from './interfaces/app-db-connection';
import { DtoMapper } from './interfaces/dto-mapper';
import { PasswordManagerService } from './interfaces/password-manager-service';

const container = new Container({ defaultScope: 'Singleton' });

container.bind<AppRoute>(TYPES.AppRoute).to(UsersApi);
container.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepositoryImpl);
container.bind<UsersService>(TYPES.UsersService).to(UsersServiceImpl);
container.bind<AppDBConnection>(TYPES.AppDBConnection).to(AppDBConnectionImpl);
container.bind<Logger>(Logger).toSelf();
container.bind<UsersController>(UsersController).toSelf();
container.bind<DtoMapper>(TYPES.DtoMapper).to(DtoMapperImpl);
container.bind<PasswordManagerService>(TYPES.PasswordManagerService).to(PasswordManagerServiceImpl);

export default container;
