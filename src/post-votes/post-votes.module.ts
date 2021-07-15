import { Module } from '@nestjs/common';
import { PostVoteService } from './services/post-votes.service';
import { PostVoteController } from './post-votes.controller';
import { PostVoteResolver } from './post-votes.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostVoteRepository } from './post-votes.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostVoteRepository])],
  providers: [PostVoteService, PostVoteResolver],
  controllers: [PostVoteController],
  exports: [PostVoteService],
})
export class PostVotesModule {}
