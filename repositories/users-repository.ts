import { Transaction } from 'sequelize/types';
import { AlreadyExistError } from './../exeptions/already-exist-error';
import { AppUtils } from './../common/app-utils';
import { injectable, inject  } from 'inversify';
import { User } from '../models/user';
import { NotFoundError } from '../exeptions/not-found-error';
import { Logger } from '../common/logger';

@injectable ()
export class UsersRepository {
    constructor(@inject(Logger) private logger: Logger) {
    }

    public async save(user: User, transaction?: Transaction): Promise<User> {
        const userInDB = await User.findOne({ where: { email: user.email }, transaction: transaction });
        if (AppUtils.hasValue(userInDB)) {
            throw new AlreadyExistError(`User with mail '${user.email}' already exist`);
        }
        this.logger.info(`Creating user with mail '${user.email}'`);

        const createdUser = await User.create(user, { transaction: transaction });

        this.logger.info(`created ${JSON.stringify(createdUser)}`);

        return createdUser;
    }

    public async getAll(): Promise<User[]> {
        return await User.findAll();
    }

    public async delete(id: number, transaction?: Transaction): Promise<void> {
        const toDelete: User = await User.findOne({ where: { id: id }, transaction: transaction  });
        if (!AppUtils.hasValue(toDelete)) {
            throw new NotFoundError(`Cannot delete user: ${id} because it is not found`);
        }
        await User.destroy({
            where: { id: id },
            transaction: transaction
        });
    }
}
