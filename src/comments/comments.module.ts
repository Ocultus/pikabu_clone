import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentVoteRepository } from 'src/comment-votes/comment-votes.repository';
import { CommentVoteService } from 'src/comment-votes/services/comment-votes.service';
import { CommentResolver } from './comment.resolver';
import { CommentController } from './comments.controller';
import { CommentRepository } from './comments.repository';
import { CommentService } from './services/comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository, CommentVoteRepository]),
  ],
  providers: [CommentService, CommentVoteService, CommentResolver],
  controllers: [CommentController],
  exports: [CommentService],
})
export class CommentModule {}
