import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import { PostVote, uniquePostVoteName } from '../post-vote.entity';
import { CreatePostVoteDto, UpdatePostVoteDto } from '../post-votes.dto';
import { PostVoteRepository } from '../post-votes.repository';

@Injectable()
export class PostVoteService {
  constructor(
    @InjectRepository(PostVoteRepository)
    private readonly postVoteRepository: PostVoteRepository,
  ) {}

  async findOne(id: PostVote['id']) {
    return this.postVoteRepository.findOne(id);
  }

  async save(
    createPostVoteDto: CreatePostVoteDto,
    userId: User['id'],
    postId: Post['id'],
  ) {
    try {
      return await this.postVoteRepository.save({
        ...createPostVoteDto,
        userId,
        postId,
      });
    } catch (error) {
      if (error && error.constraint === uniquePostVoteName) {
        throw new BadRequestException('Pair userId/postId duplicate');
      }
    }
  }

  async update(id: PostVote['id'], updatePostVoteDto: UpdatePostVoteDto) {
    const postVote = await this.postVoteRepository.findOne(id);
    if (postVote?.voteType !== updatePostVoteDto?.voteType) {
      const voteTime = new Date();
      return this.postVoteRepository.save({
        ...postVote,
        ...updatePostVoteDto,
        voteTime,
      });
    }
    return postVote;
  }

  async remove(id: PostVote['id']) {
    const postVote = await this.postVoteRepository.findOne(id);
    return this.postVoteRepository.remove(postVote);
  }

  async findManyByUserId(userId: User['id']) {
    return this.postVoteRepository.find({
      where: {
        userId: userId,
      },
    });
  }

  async findManyByPostId(postId: User['id']) {
    return this.postVoteRepository.find({
      where: {
        postId: postId,
      },
    });
  }
}
