import { AppUtils } from './../common/app-utils';
import { UsersService } from './../services/users-service';
import { injectable, inject  } from 'inversify';
import { User } from '../models/user';

@injectable ()
export class UsersController {

    constructor(@inject(UsersService) private usersService: UsersService){
    }

    public createUser = async (req: any, res: any, next: any) => {
        let userToCreate: User = null;
        try {
            userToCreate = req.body;
            const createdUser: User = await this.usersService.create(userToCreate);
            res.send(createdUser);
        } catch (err) {
            console.error(`Cannot create user: ${JSON.stringify(userToCreate)}, ${AppUtils.getFullException(err)}`);
            next(err);
        }
    }

    public getAll = async (req: any, res: any, next: any) => {
        try {
            const users: User[] = await this.usersService.getAll();
            res.send(users);
        } catch(err) {
            console.error(`Cannot get all users, ${AppUtils.getFullException(err)}`);
            next(err);
        }
    }

    public delete = async (req: any, res: any, next: any) => {
        let userId: string = null;
        try {
            userId = req.params.id;
            await this.usersService.delete(userId);
            res.send(`User ${userId} has been deleted`);
        } catch(err) {
            console.error(`Failed to delete user: ${userId}, ${AppUtils.getFullException(err)}`);
            next(err);
        }
    } 
}
