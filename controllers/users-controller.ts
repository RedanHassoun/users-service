import { AppUtils } from './../common/app-utils';
import { UsersService } from './../services/users-service';
import { injectable, inject  } from 'inversify';
import { User } from '../models/user';
import { Logger } from '../common/logger';

@injectable ()
export class UsersController {

    constructor(@inject(UsersService) private usersService: UsersService,
                @inject(Logger) private logger: Logger){
    }

    public createUser = async (req: any, res: any, next: any) => {
        let userToCreate: User = null;
        try {
            userToCreate = req.body;
            const createdUser: User = await this.usersService.create(userToCreate);

            res.status(201);
            next(createdUser);
        } catch (err) {
            this.logger.error(`Cannot create user: ${JSON.stringify(userToCreate)}`, err);
            next(err);
        }
    }

    public getAll = async (req: any, res: any, next: any) => {
        try {
            const users: User[] = await this.usersService.getAll();
            next(users);
        } catch(err) {
            this.logger.error(`Cannot get all users`, err);
            next(err);
        }
    }

    public delete = async (req: any, res: any, next: any) => {
        let userId: number = null;
        try {
            userId = Number(req.params.id);
            await this.usersService.delete(userId);
            next(`User ${userId} has been deleted`);
        } catch(err) {
            this.logger.error(`Failed to delete user: ${userId}`, err);
            next(err);
        }
    } 
}
