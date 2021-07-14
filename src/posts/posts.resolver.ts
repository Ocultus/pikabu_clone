import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PaginationArgs } from 'src/common/pagging/pagination-args';
import { PostTagService } from 'src/post-tags/services/post-tags.service';
import { PaginatedPost } from './paginated-post.entity';
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

  @Query(() => PaginatedPost)
  async getPosts(@Args() pagination: PaginationArgs) {
    return this.postService.getPaginatedPosts(pagination);
  }

  @Query(() => [Post])
  async getFreshPosts() {
    return this.postService.getFreshPosts();
  }

  @Query(() => [Post])
  async getPostsByCreateAt() {
    return this.postService.getPostsSortByCreateAt();
  }
}
