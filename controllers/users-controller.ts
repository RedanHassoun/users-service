import { UserDto } from './../models/dto/user-dto';
import { UsersService } from './../services/users-service';
import { injectable, inject  } from 'inversify';
import { User } from '../models/db/user';
import { Logger } from '../common/logger';
import { DtoMapper } from '../common/dto-mapper';

@injectable ()
export class UsersController {

    constructor(@inject(UsersService) private usersService: UsersService,
                @inject(Logger) private logger: Logger,
                @inject(DtoMapper) private dtoMapper: DtoMapper){
    }

    public createUser = async (req: any, res: any, next: any) => {
        let userToCreate: User = null;
        try {
            userToCreate = this.dtoMapper.asEntity(req.body);
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
            
            const usersDto: UserDto[] = users.map(user => this.dtoMapper.asDto(user));
            next(usersDto);
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
