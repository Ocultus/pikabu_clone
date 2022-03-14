import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { PostTag } from './post-tag.entity';
import { PostTagService } from './services/post-tags.service';

@Resolver(() => PostTag)
export class PostTagResolver {
  constructor(private readonly postTagService: PostTagService) {}

  @Query(() => PostTag)
  async postTag(@Args('id', { type: () => ID }) id: PostTag['id']) {
    return this.postTagService.findOne(id);
  }
}
