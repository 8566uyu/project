import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOneOptions, Repository } from 'typeorm'
import { User } from '../domain/user.entity'
import { UserAuthority } from '../domain/user-authority.entity'
import { RoleType } from './role-type'

@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
      @InjectRepository(UserAuthority)
      private userAuthorityRepository: Repository<UserAuthority>,
  ){}
  
  async findByFields(options: FindOneOptions<User>): Promise<User | undefined> {
    return await this.userRepository.findOne(options);
  }
  
  async registerUser(user: User): Promise<User> {
    // let userFind: User = await this.findByFields({
    //   where: { kakaoId: newUser.kakaoId }
    // });
    // if(userFind) {
    //   throw new HttpException('Username aleady used!', HttpStatus.BAD_REQUEST);
    // }
    const registeredUser = await this.save(user);
    if(registeredUser){
      await this.saveAuthority(registeredUser.id);
    }else {
      throw new HttpException('Username register error!', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    return registeredUser;
  }
  
  async save(user: User): Promise<User | undefined> {
    return await this.userRepository.save(user);
  }
  
  private async saveAuthority(userId: number): Promise<UserAuthority | undefined> {
    let userAuth = new UserAuthority();
    userAuth.userId = userId;
    userAuth.authorityName = RoleType.USER;
    return await this.userAuthorityRepository.save(userAuth);
  }

}
