import { UserDto } from './../models/dto/user-dto';

export interface ValidationService {
    validateUser(user: UserDto): Promise<string>;
}
