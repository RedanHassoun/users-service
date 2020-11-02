export interface PasswordManagerService {
    hashAndSalt(password: string): Promise<string>;
}
