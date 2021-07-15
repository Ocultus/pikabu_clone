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
import { PostVoteService } from 'src/post-votes/services/post-votes.service';
import { PaginatedPost } from './paginated-post.entity';
import { Post } from './post.entity';
import { PostService } from './services/posts.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly postTagService: PostTagService,
    private readonly postVoteService: PostVoteService,
  ) {}

  @Query(() => Post)
  async post(@Args('id', { type: () => ID }) id: Post['id']) {
    return this.postService.findOne(id);
  }

  @ResolveField()
  async postTags(@Parent() post: Post) {
    return this.postTagService.findManyByPostId(post.id);
  }

  @ResolveField()
  async postVotes(@Parent() post: Post) {
    return this.postVoteService.findManyByPostId(post.id);
  }

  @Query(() => PaginatedPost)
  async getPosts(@Args() pagination: PaginationArgs) {
    return this.postService.getPaginatedPosts(pagination);
  }

  @Query(() => [Post])
  async getPostsByLikeCount() {
    return this.postService.getPostsSortByLikeCount();
  }

  @Query(() => [Post])
  async getFreshPosts() {
    return this.postService.getFreshPosts();
  }

  @Query(() => [Post])
  async getPostsByCreateAt() {
    return this.postService.getPostsSortByCreateAt();
  }

  @Query(() => [Post])
  async getMostLikedPosts() {
    return this.postService.getMostLikedPosts();
  }

  @Query(() => [Post])
  async getMostLiked24hPosts() {
    return this.postService.getMostFreshLikedPosts();
  }

  @Query(() => [Post])
  async getPostsWithTag(@Args('tag') tag: string) {
    return this.postService.getPostsWithTag(tag);
  }

  @Query(() => [Post])
  async getPostsWithTags(
    @Args('tags', { type: () => [String] }) tags: string[],
  ) {
    return this.postService.getPostsWithTags(tags);
  }
}
