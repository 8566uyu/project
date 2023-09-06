import { FindOneOptions, Repository } from 'typeorm';
import { User } from '../domain/user.entity';
import { UserAuthority } from '../domain/user-authority.entity';
export declare class UserService {
    private userRepository;
    private userAuthorityRepository;
    constructor(userRepository: Repository<User>, userAuthorityRepository: Repository<UserAuthority>);
    findByFields(options: FindOneOptions<User>): Promise<User | undefined>;
    registerUser(user: User): Promise<User>;
    save(user: User): Promise<User | undefined>;
    private saveAuthority;
}
