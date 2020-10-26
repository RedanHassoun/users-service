import { UsersService } from './../services/users-service';
import { injectable, inject  } from 'inversify';
import { User } from '../models/user';

@injectable ()
export class UsersController {

    constructor(@inject(UsersService) private usersService: UsersService){
    }

    public createUser = async (req: any, res: any, next: any) => {
        const userToCreate: User = req.body;
        
        const createdUser: User = await this.usersService.create(userToCreate);
        res.send(createdUser);
    }

    public getAll = async (req: any, res: any, next: any) => {
        const users: User[] = await this.usersService.getAll();
        res.send(users);
    }

    public delete = async (req: any, res: any, next: any) => {
        const userId: string = req.params.id;
        await this.usersService.delete(userId);
        res.send(`User ${userId} has been deleted`);
    } 
}
