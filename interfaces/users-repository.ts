import { Transaction } from 'sequelize/types';
import { User } from "../models/db/user";

export interface UsersRepository {
    save(user: User, transaction?: Transaction): Promise<User>;
    getAll(): Promise<User[]>;
    delete(id: number, transaction?: Transaction): Promise<void>;
}
