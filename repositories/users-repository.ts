import { AppUtils } from './../common/app-utils';
import { injectable  } from 'inversify';
import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';
import { NotFoundError } from '../exeptions/not-found-error';

@injectable ()
export class UsersRepository {
    private users: User[] = []; // TODO: save to DB

    public async save(user: User): Promise<User> {
        user.id = uuidv4();
        this.users.push(user);
        return user;
    }

    public async getAll(): Promise<User[]> {
        return this.users;
    }

    public async delete(id: string): Promise<void> {
        const toDelete: User = this.users.find(u => u.id === id);
        if (!AppUtils.hasValue(toDelete)) {
            throw new NotFoundError(`Cannot delete user: ${id} because it is not found`);
        }
        const index: number = this.users.indexOf(toDelete);
        this.users.splice(index, 1);
    }
}
