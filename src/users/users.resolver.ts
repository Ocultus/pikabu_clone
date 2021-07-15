import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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
}
