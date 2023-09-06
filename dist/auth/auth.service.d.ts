import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    kakaoLogin(param: {
        code: any;
        domain: any;
    }): Promise<any>;
    login(kakao: any): Promise<{
        accessToken: string;
    } | undefined>;
}
