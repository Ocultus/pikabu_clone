import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { PostVote } from './post-vote.entity';
import { PostVoteService } from './services/post-votes.service';

@Resolver(() => PostVote)
export class PostVoteResolver {
  constructor(private readonly postVoteService: PostVoteService) {}

  @Query(() => PostVote)
  async post(@Args('id', { type: () => ID }) id: PostVote['id']) {
    return this.postVoteService.findOne(id);
  }
}
