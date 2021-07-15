import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'src/common/pagging/paginate';
import { PaginationArgs } from 'src/common/pagging/pagination-args';
import { User } from 'src/users/user.entity';
import { PaginatedPost } from '../paginated-post.entity';
import { Post } from '../post.entity';
import { CreatePostDto, UpdatePostDto } from '../posts.dto';
import { PostRepository } from '../posts.repository';

export class PostService {
  constructor(
    @InjectRepository(PostRepository)
    private readonly postRepository: PostRepository,
  ) {}

  async findOne(id: Post['id']) {
    return this.postRepository.findOne(id);
  }

  async save(createPostDto: CreatePostDto, userId: User['id']) {
    if (
      createPostDto.title.length < 3 ||
      createPostDto.description.length < 10
    ) {
      throw new BadRequestException();
    }
    return this.postRepository.save({ ...createPostDto, userId });
  }

  async update(id: Post['id'], updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne(id);
    return this.postRepository.save({ ...post, ...updatePostDto });
  }

  async remove(id: Post['id']): Promise<Post> {
    const post = await this.postRepository.findOne(id);
    return this.postRepository.remove(post);
  }

  async findManyByUserId(userId: User['id']): Promise<Post[]> {
    return this.postRepository.find({
      where: {
        userId: userId,
      },
    });
  }

  async getPaginatedPosts(
    paginationArgs: PaginationArgs,
  ): Promise<PaginatedPost> {
    const query = this.postRepository.createQueryBuilder().select();
    return paginate(query, paginationArgs);
  }

  async getPostsSortByCreateAt(limit = 10): Promise<Post[]> {
    limit = limit > 0 ? limit : 10;
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .orderBy('posts.createAt')
      .limit(limit)
      .getMany();
    return posts;
  }

  async getPostsSortByLikeCount(limit = 10): Promise<Post[]> {
    limit = limit > 0 ? limit : 10;
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .leftJoin('posts.postVotes', 'post-vote')
      .groupBy('posts.id')
      .orderBy(
        `COUNT (post-vote.voteType) FILTER (WHERE post-vote.voteType = 'like')`,
        'DESC',
      )
      .limit(limit)
      .getMany();

    return posts;
  }

  async getFreshPosts(limit = 10): Promise<Post[]> {
    limit = limit > 0 ? limit : 10;
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .where(`posts.createAt >= NOW() - '1 day'::INTERVAL`)
      .limit(limit)
      .getMany();
    return posts;
  }

  async getMostLikedPosts(limit = 10) {
    limit = limit > 0 ? limit : 10;
    const type = 'like';
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .leftJoin('posts.postVotes', 'post-vote')
      .andWhere('post-vote.voteType = :type', { type })
      .groupBy('posts.id')
      .orderBy('count(post-vote.voteType)', 'DESC')
      .limit(limit)
      .getMany();
    return posts;
  }

  async getMostFreshLikedPosts(limit = 10) {
    limit = limit > 0 ? limit : 10;
    const type = 'like';
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .where(`posts.createAt >= NOW() - '1 day'::INTERVAL`)
      .innerJoin('posts.postVotes', 'post-vote')
      .andWhere('post-vote.voteType = :type', { type })
      .groupBy('posts.id')
      .orderBy('count(post-vote.id)', 'DESC')
      .limit(limit)
      .getMany();
    return posts;
  }

  async getPostsWithTag(tag: string, limit = 10) {
    limit = limit > 0 ? limit : 10;
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .innerJoin('posts.postTags', 'post-tag')
      .andWhere('post-tag.name =:tag', { tag })
      .limit(limit)
      .getMany();
    return posts;
  }

  async getPostsWithTags(tags: string[], limit = 10) {
    if (tags.length === 1) {
      return this.getPostsWithTag(tags[0]);
    }
    limit = limit > 0 ? limit : 10;
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .innerJoinAndSelect('posts.postTags', 'post-tag')
      .limit(limit)
      .getMany();

    const getPostsWithTags: Post[] = [];

    posts.forEach((post) => {
      const tagsName = post.postTags.map((x) => x.name);
      tags.every((r) => tagsName.includes(r))
        ? getPostsWithTags.push(post)
        : null;
    });
    return getPostsWithTags;
  }
}
