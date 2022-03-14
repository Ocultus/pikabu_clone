import { Module } from '@nestjs/common';
import { CommentVoteController } from './comment-votes.controller';
import { CommentVoteResolver } from './comment-votes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentVoteRepository } from './comment-votes.repository';
import { CommentVoteService } from './services/comment-votes.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentVoteRepository])],
  providers: [CommentVoteService, CommentVoteResolver],
  controllers: [CommentVoteController],
  exports: [CommentVoteService],
})
export class commentVotesModule {}
