import { AppDBConnection } from './../interfaces/app-db-connection';
import { User } from '../models/db/user';
import { injectable } from 'inversify';
import { Sequelize } from "sequelize-typescript";
import { Transaction } from 'sequelize/types';

@injectable ()
export class AppDBConnectionImpl implements AppDBConnection {
    private db: Sequelize;

    public async connect(): Promise<void> {
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