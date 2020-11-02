import { User } from "../models/db/user";
import { Transaction } from "sequelize/types";

export interface AppDBConnection {
    connect(): Promise<void>;
    createTransaction(): Promise<Transaction>;
}
