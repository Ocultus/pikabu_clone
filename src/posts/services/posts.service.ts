import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
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
}
