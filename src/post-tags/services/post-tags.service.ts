import { BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { PostTag, uniquePostTagName } from '../post-tag.entity';
import { CreatePostTagDto, UpdatePostTagDto } from '../post-tags.dto';
import { PostTagRepository } from '../post-tags.repository';

export class PostTagService {
  constructor(
    @InjectRepository(PostTagRepository)
    private readonly postTagRepository: PostTagRepository,
  ) {}

  async findOne(id: PostTag['id']) {
    return this.postTagRepository.findOne(id);
  }

  async save(createPostTagDto: CreatePostTagDto, postId: Post['id']) {
    try {
      return await this.postTagRepository.save({ ...createPostTagDto, postId });
    } catch (error) {
      if (error && error.constraint === uniquePostTagName) {
        throw new BadRequestException('Pair Post/name duplicate');
      }
    }
  }

  async update(id: PostTag['id'], updatePostDto: UpdatePostTagDto) {
    const postTag = await this.postTagRepository.findOne(id);
    return this.postTagRepository.save({ ...postTag, ...updatePostDto });
  }

  async remove(id: Post['id']): Promise<PostTag> {
    const postTag = await this.postTagRepository.findOne(id);
    return this.postTagRepository.remove(postTag);
  }

  async findManyByPostId(postId: Post['id']): Promise<PostTag[]> {
    return this.postTagRepository.find({
      where: {
        postId: postId,
      },
    });
  }
}
