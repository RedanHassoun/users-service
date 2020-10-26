import { Container } from "inversify"
import { UsersApi } from "./routes/users.api";
import { UsersController } from "./controllers/users-controller";

export class IOCContainerConfig {

    public static getContainer(): Container {
        const container = new Container({ defaultScope: 'Singleton' });

        container.bind<UsersApi>(UsersApi).toSelf();
        container.bind<UsersController>(UsersController).toSelf();

        return container;
    }

}