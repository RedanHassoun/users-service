import { Transaction } from 'sequelize/types';
import { AppUtils } from '../common/app-utils';
import { injectable, inject } from 'inversify';
import { User } from '../models/db/user';
import { InputError } from '../exeptions/input-error';
import { Logger } from '../common/logger';
import { UsersService } from '../interfaces/users-service';
import { UsersRepository } from '../interfaces/users-repository';
import { TYPES } from '../types';
import { AppDBConnection } from '../interfaces/app-db-connection';
import { PasswordManagerService } from '../interfaces/password-manager-service';

@injectable()
export class UsersServiceImpl implements UsersService {

    constructor(@inject(TYPES.UsersRepository) private usersRepository: UsersRepository,
        @inject(TYPES.AppDBConnection) private appDBConnection: AppDBConnection,
        @inject(Logger) private logger: Logger,
        @inject(TYPES.PasswordManagerService) private passwordManager: PasswordManagerService) {
    }

    public async create(user: User): Promise<User> {
        this.logger.info(`Creating user: ${user.name}`);
        let transaction: Transaction = null;
        try {
            const hashedPassword = await this.passwordManager.hashAndSalt(user.password);
            user.password = hashedPassword;

            transaction = await this.appDBConnection.createTransaction();

            const createdUser = await this.usersRepository.save(user, transaction);
            await transaction.commit();

            this.logger.info(`Created user with id: ${createdUser.id}`);
            return createdUser;
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
            }
            throw err;
        }
    }

    public async getAll(): Promise<User[]> {
        const users: User[] = await this.usersRepository.getAll();
        this.logger.info(`Returning ${users.length} users`);
        return users;
    }

    public async delete(id: number): Promise<void> {
        if (!AppUtils.isInteger(id)) {
            throw new InputError('Cannot delete user, the id must be an integer');
        }

        let transaction: Transaction = null;
        try {
            this.logger.info(`Deleting user with id: ${id}`);

            transaction = await this.appDBConnection.createTransaction();
            await this.usersRepository.delete(id, transaction);

            await transaction.commit();

            this.logger.info(`User with id ${id} has been deleted.`);
        } catch (err) {
            if (transaction) {
                await transaction.rollback();
            }
            throw err;
        }
    }
}
