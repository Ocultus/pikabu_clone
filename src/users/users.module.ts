import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PostRepository } from 'src/posts/posts.repository';
import { PostService } from 'src/posts/services/posts.service';
import { UserService } from './services/users.service';
import { UserRepository } from './user.repository';
import { UserResolver } from './users.resolver';

@Module({
  providers: [JwtStrategy, UserService, UserResolver, PostService],
  imports: [
    TypeOrmModule.forFeature([UserRepository, PostRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [PassportModule],
})
export class UserModule {}
