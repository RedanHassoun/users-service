import { User } from '../models/db/user';
import { injectable } from 'inversify';
import { Sequelize } from "sequelize-typescript";
import { Transaction } from 'sequelize/types';

@injectable ()
export class AppDBConnection {
    private db: Sequelize;

    public async connect(): Promise<void> {
        console.log(`Database url: ${process.env.DATABASE_URL}`);
        this.db = new Sequelize({
            database: 'usersapp',
            dialect: 'postgres',
            username: 'postgres',
            password: 'postgres',
            host: 'db',
            port: 5432
        });
        this.db.addModels([User]);
        await this.db.authenticate();
        await this.db.sync();
    }

    public async createTransaction(): Promise<Transaction> {
        return await this.db.transaction();
    }
}