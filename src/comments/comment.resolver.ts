import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentVote } from 'src/comment-votes/comment-vote.entity';
import { CommentVoteService } from 'src/comment-votes/services/comment-votes.service';
import { PaginationArgs } from 'src/common/pagging/pagination-args';
import { Comment } from './comment.entity';
import { PaginatedComment } from './paginated-comment';
import { CommentService } from './services/comments.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentVoteService: CommentVoteService,
  ) {}

  @Query(() => Comment)
  async comment(@Args('id', { type: () => ID }) id: Comment['id']) {
    return this.commentService.findOne(id);
  }

  @ResolveField(() => CommentVote)
  async commentVotes(@Parent() comment: Comment) {
    return this.commentVoteService.findManyByCommentId(comment.id);
  }

  @Query(() => PaginatedComment)
  async getComments(@Args() pagination: PaginationArgs) {
    return this.commentService.getPaginatedPosts(pagination);
  }

  @Query(() => [Comment])
  async getCommentByLikeCount() {
    return this.commentService.getCommentsByLikeCount();
  }

  @Query(() => [Comment])
  async getCommentByCreateAt() {
    return this.commentService.getCommentsByCreateAt();
  }
}
