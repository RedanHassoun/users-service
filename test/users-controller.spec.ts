import { HttpRequestStub, HttpResponseStub, nextStub } from './stubs/expres-http-stubs';
import { expect } from 'chai';
import { UsersController } from './../controllers/users-controller';
import { UsersService } from './../services/users-service';
import { mock, when, instance, anything } from "ts-mockito";
import { User } from '../models/user';

describe('Users HttpRequest', () => {
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

        const usersController = new UsersController(serviceInstance);

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
            expect(result).not.to.be.null.and.to.have.property('id');
        });
    });
});
