import { AppUtils } from './app-utils';
import { injectable } from "inversify";
import { User } from '../models/db/user';
import { UserDto } from '../models/dto/user-dto';
import { DtoMapper } from '../interfaces/dto-mapper';

@injectable ()
export class DtoMapperImpl implements DtoMapper {
    public asDto(user: User): UserDto {
        if (!AppUtils.hasValue(user)) {
            return null;
        }
        return {
            id: user.id,
            name: user.name,
            email: user.email,
        } as UserDto;
    }

    public asEntity(userDto: UserDto): User {
        if (!AppUtils.hasValue(userDto)) {
            return null;
        }
        return {
            id: userDto.id,
            name: userDto.name,
            email: userDto.email,
            password: userDto.password
        } as User;
    }
}
