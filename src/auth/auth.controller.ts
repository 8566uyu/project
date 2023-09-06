import { Controller, Post, Body, Response, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
      private authService: AuthService
  ){}
  @Post('/login')
  async login(@Body() body: any, @Response() res): Promise<any> {
    try {
      // 카카오 토큰 조회 후 계정 정보 가져오기
      const { code, domain } = body;
      if (!code || !domain) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }
      
      //카카오 로그인
      const kakao = await this.authService.kakaoLogin({ code, domain });
      
      // console.log(`kakaoUserInfo : ${JSON.stringify(kakao)}`);
      if (!kakao.id) {
        throw new BadRequestException('카카오 정보가 없습니다.');
      }
      
      // 로그인 처리 - 회원 가입이 안되어 있을 경우 가입 처리
      const jwt =  await this.authService.login(kakao);
      console.log(`jwt.accessToken : ${jwt.accessToken}`);
      res.send({
        accessToken: jwt.accessToken,
        message: 'success'
      });
      
      res.send({
        user: kakao,
        message: 'success',
      });
    } catch (e) {
      console.log(e);
      // throw new UnauthorizedException();
    }
  }
}
