import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CommentVoteService } from 'src/comment-votes/services/comment-votes.service';
import { PostVoteService } from 'src/post-votes/services/post-votes.service';
import { PostService } from 'src/posts/services/posts.service';
import { UserService } from './services/users.service';
import { User } from './user.entity';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    private readonly postVoteService: PostVoteService,
    private readonly commentVoteService: CommentVoteService,
  ) {}

  @Query(() => User)
  async user(@Args('id', { type: () => ID }) id: User['id']) {
    return this.userService.findOne(id);
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    return this.postService.findManyByUserId(user.id);
  }

  @ResolveField()
  async postVotes(@Parent() user: User) {
    return this.postVoteService.findManyByUserId(user.id);
  }

  @ResolveField()
  async commentVotes(@Parent() user: User) {
    return this.commentVoteService.findManyByUserId(user.id);
  }
}
