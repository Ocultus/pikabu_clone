import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { UserService } from './services/users.service';
import { UserRepository } from './user.repository';
import { UserController } from './users.controller';

@Module({
  providers: [JwtStrategy, UserService],
  controllers: [UserController],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [PassportModule],
})
export class UserModule {}
