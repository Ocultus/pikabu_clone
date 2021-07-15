import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { CommentRepository } from 'src/comments/comments.repository';
import { CommentService } from 'src/comments/services/comments.service';
import { PostVoteRepository } from 'src/post-votes/post-votes.repository';
import { PostVoteService } from 'src/post-votes/services/post-votes.service';
import { PostRepository } from 'src/posts/posts.repository';
import { PostService } from 'src/posts/services/posts.service';
import { UserService } from './services/users.service';
import { UserRepository } from './user.repository';
import { UserResolver } from './users.resolver';

@Module({
  providers: [
    JwtStrategy,
    UserService,
    UserResolver,
    PostService,
    PostVoteService,
    CommentService,
  ],
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      PostRepository,
      PostVoteRepository,
      CommentRepository,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [PassportModule],
})
export class UserModule {}
