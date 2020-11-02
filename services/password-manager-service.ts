import { InputError } from './../exeptions/input-error';
import { AppUtils } from './../common/app-utils';
import { injectable, inject  } from 'inversify';
import * as bcrypt from 'bcrypt';

@injectable ()
export class PasswordManagerServiceImpl {
    private readonly SALT_ROUNDS = 10;

    public async hashAndSalt(password: string): Promise<string> {
        if (!AppUtils.hasValue(password)) {
            throw new InputError('Cannot hash password because it is not defined');
        }
        const salt = await bcrypt.genSalt(this.SALT_ROUNDS);

        return await bcrypt.hash(password, salt);
    }
}
