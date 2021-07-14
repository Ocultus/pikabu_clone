import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Post } from './post.entity';
import { PostService } from './services/posts.service';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {};

  @Query((returns) => Post)
  async post(@Args('id', { type: () => ID }) id: Post['id']) {
    return this.postService.findOne(id);
  }
}
