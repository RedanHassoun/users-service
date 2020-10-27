import { Table, Column, PrimaryKey, IsUUID, Model } from 'sequelize-typescript';
@Table({
    tableName: 'users',
    schema: 'users_management'
})
export class User extends Model<User> {
    @IsUUID(4)
    @Column
    @PrimaryKey
    public id: string;

    @Column
    public name: string;

    @Column
    public email: string;

    @Column
    public password: string;
}
