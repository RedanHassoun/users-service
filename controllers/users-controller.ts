import { InputError } from './../exeptions/input-error';
import { ValidationService } from './../interfaces/validation-service';
import { UserDto } from './../models/dto/user-dto';
import { injectable, inject } from 'inversify';
import { User } from '../models/db/user';
import { Logger } from '../common/logger';
import { UsersService } from '../interfaces/users-service';
import { TYPES } from '../types';
import { DtoMapper } from '../interfaces/dto-mapper';

@injectable()
export class UsersController {

    constructor(@inject(TYPES.UsersService) private usersService: UsersService,
        @inject(Logger) private logger: Logger,
        @inject(TYPES.ValidationService) private validationService: ValidationService,
        @inject(TYPES.DtoMapper) private dtoMapper: DtoMapper) {
    }

    public createUser = async (req: any, res: any, next: any) => {
        let userPayload: UserDto = null;
        try {
            userPayload = req.body;
            const validationError: string = await this.validationService.validateUser(userPayload);
            if (validationError) {
                throw new InputError(validationError);
            }

            const userToCreate: User = this.dtoMapper.asEntity(req.body);
            const createdUser: User = await this.usersService.create(userToCreate);

            res.status(201);
            next(this.dtoMapper.asDto(createdUser));
        } catch (err) {
            this.logger.error(`Cannot create user: ${JSON.stringify(userPayload)}`, err);
            next(err);
        }
    }

    public getAll = async (req: any, res: any, next: any) => {
        try {
            const users: User[] = await this.usersService.getAll();

            const usersDto: UserDto[] = users.map(user => this.dtoMapper.asDto(user));
            next(usersDto);
        } catch (err) {
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
        } catch (err) {
            this.logger.error(`Failed to delete user: ${userId}`, err);
            next(err);
        }
    }
}
