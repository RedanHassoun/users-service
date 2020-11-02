import { User } from "../models/db/user";

export interface UsersService {
    create(user: User): Promise<User>;
    getAll(): Promise<User[]>;
    delete(id: number): Promise<void>;
}
