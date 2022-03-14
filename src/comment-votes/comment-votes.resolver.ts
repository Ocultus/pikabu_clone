import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { CommentVote } from './comment-vote.entity';
import { CommentVoteService } from './services/comment-votes.service';

@Resolver(() => CommentVote)
export class CommentVoteResolver {
  constructor(private readonly commentVoteService: CommentVoteService) {}

  @Query(() => CommentVote)
  async comment(@Args('id', { type: () => ID }) id: CommentVote['id']) {
    return this.commentVoteService.findOne(id);
  }
}
