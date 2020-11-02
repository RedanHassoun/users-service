import { injectable } from 'inversify';
import { ValidationService } from '../interfaces/validation-service';
import { UserDto } from '../models/dto/user-dto';
import * as Joi from 'joi';
import { userDtoJoiSchema } from './joi-schemas';

@injectable()
export class ValidationServiceImpl implements ValidationService {

    async validateUser(user: UserDto): Promise<string> {
        const joiResult: Joi.ValidationResult = userDtoJoiSchema.validate(user);
        if (joiResult.error) {
            return joiResult.error.message;
        }
        return null;
    }
}
