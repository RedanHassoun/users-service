import { User } from "../models/db/user";
import { UserDto } from "../models/dto/user-dto";

export interface DtoMapper {
    asDto(user: User): UserDto;
    asEntity(userDto: UserDto): User;
}
