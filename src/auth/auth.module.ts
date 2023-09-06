import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { JwtStrategy } from './security/passport.jwt.strategy'
import { User } from '../domain/user.entity'
import {PassportModule} from '@nestjs/passport'
import {UserAuthority} from '../domain/user-authority.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAuthority]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '300s'},
    }),
      PassportModule
  ],
    exports: [TypeOrmModule,AuthService, UserService],
    controllers: [AuthController],
    providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule {}
