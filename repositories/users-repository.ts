import { injectable  } from 'inversify';
import { User } from '../models/user';
import { v4 as uuidv4 } from 'uuid';

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
}
