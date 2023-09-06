import { Injectable, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import * as qs from 'qs';
import { User } from '../domain/user.entity'
import { UserService } from './user.service'
import { Payload } from './security/payload.interface'
import { JwtService } from '@nestjs/jwt'



@Injectable()
export class AuthService {
  constructor (
      private userService: UserService,
      private jwtService: JwtService,
  ) {
  }
  
  async kakaoLogin (param: { code: any; domain: any }) {
    const {
      code, domain } = param;
    const kakaoKey = '56939c9eda44c5b7cc548ba349b990b4';
    const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
    const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
    
    
    
    const body = {
      grant_type:'authorization_code',
      client_id:kakaoKey,
      redirect_uri:`${ domain }/kakao-callback`,
      code,
    };
    
    const headers = {
      'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
    };
    try {
      const response = await axios({
        method:'POST',
        url:kakaoTokenUrl,
        timeout:30000,
        headers,
        data:qs.stringify(body),
      });
      if (response.status === 200) {
        console.log(`kakaoToken : ${ JSON.stringify(response.data) }`);
        // Token 을 가져왔을 경우 사용자 정보 조회
        const headerUserInfo = {
          'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
          Authorization:'Bearer ' + response.data.access_token,
        };
        console.log(`url : ${ kakaoTokenUrl }`);
        console.log(`headers : ${ JSON.stringify(headerUserInfo) }`);
        const responseUserInfo = await axios({
          method:'GET',
          url:kakaoUserInfoUrl,
          timeout:30000,
          headers:headerUserInfo,
        });
        console.log(`responseUserInfo.status : ${ responseUserInfo.status }`);
        if (responseUserInfo.status === 200) {
          console.log(
              `kakaoUserInfo : ${ JSON.stringify(responseUserInfo.data) }`,
          );
          return responseUserInfo.data;
        } else {
          throw new UnauthorizedException('로그인실패');
        }
      } else {
        throw new UnauthorizedException();
      }
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
  
  // @ts-ignore
  async login (kakao: any): Promise<{ accessToken: string } | undefined> {
    //회원가입여부체크
    
    let userFind: User = await this.userService.findByFields({
      where:{ kakaoId:kakao.id }
    });
    if (!userFind) {
      // isFirstLogin = true;
      // 회원 가입
      const user = new User();
      user.kakaoId = kakao.id;
      user.email = kakao.kakao_account.email;
      user.name = kakao.kakao_account.name;
      
      userFind = await this.userService.registerUser(user);
    }
    
    
    const payload: Payload = {
      id:userFind.id,
      name:userFind.name,
      authorities:userFind.authorities
    };
    return {
      accessToken:this.jwtService.sign(payload)
    };
  }
}


