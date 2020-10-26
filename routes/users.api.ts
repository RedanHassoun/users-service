import { AppRoute } from './../common/interfaces/app-route';
import { Router } from 'express';
import { injectable  } from 'inversify';
import { UsersController } from '../controllers/users-controller';

@injectable ()
export class UsersApi implements AppRoute {
    private router: Router;

    constructor(private usersController: UsersController) {
        this.router = Router();
    }

    public setRoutes(): void {
        this.router.post('/user', this.usersController.createUser);
    }

    getRouter(): Router {
        return this.router;
    }
}