import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostService } from 'src/posts/services/posts.service';
import { UserService } from './services/users.service';
import { User } from './user.entity';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => ID }) id: User['id']) {
    return this.userService.findOne(id);
  }

  @ResolveField()
  async posts(@Parent() user: User) {
    return this.postService.findManyByUserId(user.id);
  }
}
