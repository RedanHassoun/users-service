import { anything } from 'ts-mockito';
import { PasswordManagerService } from './../services/password-manager-service';
import { AlreadyExistError } from './../exeptions/already-exist-error';
import { UsersRepository } from './../repositories/users-repository';
import { UsersService } from './../services/users-service';
import * as chai from 'chai';   
import { User } from '../models/db/user';
import { AppDBConnection } from '../repositories/app-db-connection';
import { mock, instance, when } from 'ts-mockito';
import { Logger } from '../common/logger';
import { expect } from 'chai';
import { InputError } from '../exeptions/input-error';

chai.should();
chai.use(require('chai-as-promised'));

describe('Users Service', () => {
    const mockedLoggerInstance: Logger = instance(mock(Logger));
    const mockedPasswordManager = mock(PasswordManagerService);
    when(mockedPasswordManager.hashAndSalt(anything())).thenReturn(Promise.resolve('abc'));
    const mockedPasswordManagerInstance: PasswordManagerService = instance(mockedPasswordManager);

    it('Should throw an error in case we try to delete a user with an undefined id', () => {
        const mockedDbConnection = mock(AppDBConnection);
        const dbConnectionInstance: AppDBConnection = instance(mockedDbConnection);

        const mockedReposetory = mock(UsersRepository);
        const repostoryInstance: UsersRepository = instance(mockedReposetory);
        const usersService = new UsersService(repostoryInstance, dbConnectionInstance, 
                                            mockedLoggerInstance, mockedPasswordManagerInstance);

        expect(() => usersService.delete(null)).to.throw;
    });

    it('Should throw an error in case we try to add an existing user', () => {
        
        const mockedDbConnection = mock(AppDBConnection);
        const dbConnectionInstance: AppDBConnection = instance(mockedDbConnection);

        const mockedReposetory = mock(UsersRepository);

        const mockedUser = mock(User);
        const userInstance = instance(mockedUser);

        when(mockedReposetory.save(userInstance, null)).thenThrow(new AlreadyExistError(''));

        const repostoryInstance: UsersRepository = instance(mockedReposetory);
        const usersService = new UsersService(repostoryInstance, dbConnectionInstance, 
                                            mockedLoggerInstance, mockedPasswordManagerInstance);

        expect(() => usersService.create(userInstance)).to.throw;
    });

    it('Should return an empty list if there are no users, instead of throwing an error', () => {
        const mockedDbConnection = mock(AppDBConnection);
        const dbConnectionInstance: AppDBConnection = instance(mockedDbConnection);

        const mockedReposetory = mock(UsersRepository);

        when(mockedReposetory.getAll()).thenReturn(Promise.resolve([]));

        const repostoryInstance: UsersRepository = instance(mockedReposetory);
        const usersService = new UsersService(repostoryInstance, dbConnectionInstance, 
                                            mockedLoggerInstance, mockedPasswordManagerInstance);

        expect(usersService.getAll()).to.be.empty;
    });

    it('Should throw an error if we call delete with a value that is not an integer', async () => {
        const mockedDbConnection = mock(AppDBConnection);
        const dbConnectionInstance: AppDBConnection = instance(mockedDbConnection);

        const mockedReposetory = mock(UsersRepository);
        const repostoryInstance: UsersRepository = instance(mockedReposetory);

        const usersService = new UsersService(repostoryInstance, dbConnectionInstance, 
                                            mockedLoggerInstance, mockedPasswordManagerInstance);

        expect(usersService.delete(1.4)).to.be.eventually.rejectedWith(InputError);
    });
});
