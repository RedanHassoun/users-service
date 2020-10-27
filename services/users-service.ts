import { Transaction } from 'sequelize/types';
import { AppUtils } from './../common/app-utils';
import { injectable, inject  } from 'inversify';
import { User } from '../models/user';
import { UsersRepository } from '../repositories/users-repository';
import { InputError } from '../exeptions/input-error';
import { AppDBConnection } from '../repositories/app-db-connection';

@injectable ()
export class UsersService {
    
    constructor(@inject(UsersRepository)  private usersRepository: UsersRepository,
                @inject(AppDBConnection) private appDBConnection: AppDBConnection) {
    }

    public async create(user: User): Promise<User> {
        console.log(`Creating user: ${user.name}`);
        let transaction: Transaction = null;
        try {
            transaction = await this.appDBConnection.createTransaction();
            const createdUser = await this.usersRepository.save(user, transaction);
            await transaction.commit();
            return createdUser;
        } catch(err) {
            if (transaction) {
                await transaction.rollback();
            }
            throw err;
        }
    }

    public async getAll(): Promise<User[]> {
        return await this.usersRepository.getAll();
    }

    public async delete(id: number): Promise<void> {
        if (!AppUtils.hasValue(id)) {
            throw new InputError('Cannot delete user because the id is not defined');
        }

        let transaction: Transaction = null;
        try {
            transaction = await this.appDBConnection.createTransaction();
            await this.usersRepository.delete(id, transaction);
            await transaction.commit();
        } catch(err) {
            if (transaction) {
                await transaction.rollback();
            }
            throw err;
        }
    }
}
