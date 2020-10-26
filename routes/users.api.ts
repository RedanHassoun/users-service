import { AppRoute } from './../common/interfaces/app-route';
import { Router } from 'express';
import { injectable, inject  } from 'inversify';
import { UsersController } from '../controllers/users-controller';

@injectable ()
export class UsersApi implements AppRoute {
    private router: Router;

    constructor(@inject(UsersController) private usersController: UsersController) {
        this.setRoutes();
    }

    public getRouter(): Router {
        return this.router;
    }

    private setRoutes(): void {
        this.router = Router();
        this.router.post('/api/v1/user', this.usersController.createUser);
        this.router.get('/api/v1/users', this.usersController.getAll);
        this.router.delete('/api/v1/user/:id', this.usersController.delete);
    }
}
