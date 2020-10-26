import { injectable, inject  } from 'inversify';
import { User } from '../models/user';
import { UsersRepository } from '../repositories/users-repository';

@injectable ()
export class UsersService {
    
    constructor(@inject(UsersRepository)  private usersRepository: UsersRepository) {
    }

    public async create(user: User): Promise<User> {
        console.log(`Creating user: ${user.name}`);
        return await this.usersRepository.save(user);
    }

    public async getAll(): Promise<User[]> {
        return await this.usersRepository.getAll();
    }
}
