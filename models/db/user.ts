import { Table, Column, PrimaryKey, Model, DataType, AutoIncrement, Unique, AllowNull, IsEmail, Length } from 'sequelize-typescript';

@Table({
    tableName: 'users'
})
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    public id: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    public name: string;

    @Unique
    @AllowNull(false)
    @IsEmail
    @Column(DataType.STRING)
    public email: string;

    @AllowNull(false)
    @Length({min: 3, max: 512})
    @Column(DataType.STRING)
    public password: string;
}
