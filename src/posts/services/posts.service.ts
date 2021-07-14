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

  async getPostsSortByCreateAt(): Promise<Post[]> {
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .orderBy('posts.createAt')
      .getMany();
    return posts;
  }

  async getFreshPosts(): Promise<Post[]> {
    const posts = await this.postRepository
      .createQueryBuilder('posts')
      .where(`posts.createAt >= NOW() - '1 day'::INTERVAL`)
      .getMany();
    return posts;
  }
}
