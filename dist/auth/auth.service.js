"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const qs = require("qs");
let AuthService = class AuthService {
    async kakaoLogin(options) {
        const { code, domain } = options;
        const kakaoKey = '56939c9eda44c5b7cc548ba349b990b4';
        const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
        const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
        const body = {
            grant_type: 'authorization_code',
            client_id: kakaoKey,
            redirect_uri: `${domain}/kakao-callback`,
            code,
        };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        };
        try {
            const response = await (0, axios_1.default)({
                method: 'POST',
                url: kakaoTokenUrl,
                timeout: 30000,
                headers,
                data: qs.stringify(body),
            });
            if (response.status === 200) {
                console.log(`kakaoToken : ${JSON.stringify(response.data)}`);
                const headerUserInfo = {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    Authorization: 'Bearer ' + response.data.access_token,
                };
                console.log(`url : ${kakaoTokenUrl}`);
                console.log(`headers : ${JSON.stringify(headerUserInfo)}`);
                const responseUserInfo = await (0, axios_1.default)({
                    method: 'GET',
                    url: kakaoUserInfoUrl,
                    timeout: 30000,
                    headers: headerUserInfo,
                });
                console.log(`responseUserInfo.status : ${responseUserInfo.status}`);
                if (responseUserInfo.status === 200) {
                    console.log(`kakaoUserInfo : ${JSON.stringify(responseUserInfo.data)}`);
                    return responseUserInfo.data;
                }
                else {
                    throw new common_1.UnauthorizedException('로그인실패');
                }
            }
            else {
                throw new common_1.UnauthorizedException();
            }
        }
        catch (error) {
            console.log(error);
            throw new common_1.UnauthorizedException();
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map