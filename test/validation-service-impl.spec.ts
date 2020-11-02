import "reflect-metadata";
import { UserDto } from './../models/dto/user-dto';
import { ValidationServiceImpl } from './../validation/validation-service-impl';
import * as chai from 'chai';   
import { expect } from 'chai';

chai.should();
chai.use(require('chai-as-promised'));

describe('Users Service', () => {
    it('Should not allow creating a user without an email', async () => {
        const validationService = new ValidationServiceImpl();
        const user = {
            name: 'abcd',
            email: null,
            password: '123456'
        } as UserDto;

        const validationResult: string = await validationService.validateUser(user);

        expect(validationResult).not.to.be.null;
    });

    it('Should not allow creating a user without a name', async () => {
        const validationService = new ValidationServiceImpl();
        const user = {
            name: null,
            email: 'abc@mail.com',
            password: '123456'
        } as UserDto;

        const validationResult: string = await validationService.validateUser(user);

        expect(validationResult).not.to.be.null;
    });

    it('Should not return a validation error if the user is valid', async () => {
        const validationService = new ValidationServiceImpl();
        const user = {
            name: 'abc',
            email: 'abc@mail.com',
            password: '123456'
        } as UserDto;

        const validationResult: string = await validationService.validateUser(user);

        expect(validationResult).to.be.null;
    });
});
