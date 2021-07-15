import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Comment } from './comment.entity';
import { CommentService } from './services/comments.service';

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => Comment)
  async comment(@Args('id', { type: () => ID }) id: Comment['id']) {
    return this.commentService.findOne(id);
  }
}
