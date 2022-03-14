import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from 'src/comments/comments.repository';
import { CommentService } from 'src/comments/services/comments.service';
import { PostTagRepository } from 'src/post-tags/post-tags.repository';
import { PostTagService } from 'src/post-tags/services/post-tags.service';
import { PostVoteRepository } from 'src/post-votes/post-votes.repository';
import { PostVoteService } from 'src/post-votes/services/post-votes.service';
import { PostController } from './posts.controller';
import { PostRepository } from './posts.repository';
import { PostResolver } from './posts.resolver';
import { PostService } from './services/posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostRepository,
      PostTagRepository,
      PostVoteRepository,
      CommentRepository,
    ]),
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostResolver,
    PostTagService,
    PostVoteService,
    CommentService,
  ],
  exports: [PostService],
})
export class PostModule {}
