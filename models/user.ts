import { Table, Column, PrimaryKey, IsUUID, Model, DataType, AutoIncrement } from 'sequelize-typescript';

@Table({
    tableName: 'users'
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    public id: number;

    @Column(DataType.STRING)
    public name: string;

    @Column(DataType.STRING)
    public email: string;

    @Column(DataType.STRING)
    public password: string;
}
