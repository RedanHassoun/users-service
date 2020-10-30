import "reflect-metadata";
import { DtoMapper } from './../common/dto-mapper';
import { NotFoundError } from './../exeptions/not-found-error';
import { HttpRequestStub, HttpResponseStub } from './stubs/expres-http-stubs';
import { expect } from 'chai';
import { UsersController } from './../controllers/users-controller';
import { UsersService } from './../services/users-service';
import { mock, when, instance, anything } from "ts-mockito";
import { User } from '../models/db/user';
import { Logger } from '../common/logger';
import container from './../inversify.config';

describe('Users Controller', () => {
    const mockedLogger = instance(mock(Logger));
    const dtoMapper = container.get(DtoMapper);

    it('Should return and object with status code 201 if the user was created', async () => {
        const mockedService = mock(UsersService);

        const mockedResult: Promise<User> = Promise.resolve({
            id: 1,
            name: 'a',
            email:  'b',
            password: 'c'
        } as User);

        when(mockedService.create(anything())).thenReturn(mockedResult);

        const serviceInstance = instance(mockedService);

        const usersController = new UsersController(serviceInstance, mockedLogger, dtoMapper);

        const req = new HttpRequestStub();
        req.body = {
            body: {
                name: 'a',
                email:  'b',
                password: 'c'
            }
        };
        const res = new HttpResponseStub();
        usersController.createUser(req, res, (result) => {
            expect(res.getStatus()).to.equal(201);
            expect(result).not.to.be.null;
        });
    });

    it('Should return a not found error in case we try to delete a non existing user', async () => {
        const mockedService = mock(UsersService);

        when(mockedService.delete(anything())).thenThrow(new NotFoundError(''));

        const serviceInstance = instance(mockedService);

        const usersController = new UsersController(serviceInstance, mockedLogger, dtoMapper);

        const req = new HttpRequestStub();
        req.params = {
            id: 5 
        };
        const res = new HttpResponseStub();
        usersController.delete(req, res, (result) => {
            expect(result).to.be.an.instanceof(NotFoundError);
        });
    });
});
