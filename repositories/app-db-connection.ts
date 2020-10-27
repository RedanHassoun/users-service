import { injectable } from 'inversify';
// import { Sequelize } from "sequelize-typescript";

@injectable ()
export class AppDBConnection {
    // private db: Sequelize;

    public async connect(): Promise<void> {
        // this.db = new Sequelize({ TODO: use sequelize
        //     database: 'users_db',
        //     dialect: 'postgres',
        //     username: 'admin',
        //     password: '123',
        //     models: [__dirname + '/../models/db/'],
        // });
        // await this.db.authenticate();
    }
}