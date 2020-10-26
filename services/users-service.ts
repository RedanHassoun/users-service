import { AppUtils } from './../common/app-utils';
import { injectable, inject  } from 'inversify';
import { User } from '../models/user';
import { UsersRepository } from '../repositories/users-repository';
import { InputError } from '../exeptions/input-error';

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

    public async delete(id: string): Promise<void> {
        if (!AppUtils.hasValue(id)) {
            throw new InputError('Cannot delete user because the id is not defined');
        }
        await this.usersRepository.delete(id);
    }
}
