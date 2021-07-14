import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostTagService } from 'src/post-tags/services/post-tags.service';
import { Post } from './post.entity';
import { PostService } from './services/posts.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly postTagService: PostTagService,
  ) {}

  @Query(() => Post)
  async post(@Args('id', { type: () => ID }) id: Post['id']) {
    return this.postService.findOne(id);
  }

  @ResolveField()
  async postTags(@Parent() post: Post) {
    return this.postTagService.findManyByPostId(post.id);
  }
}
