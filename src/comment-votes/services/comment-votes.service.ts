import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from 'src/comments/comment.entity';
import { User } from 'src/users/user.entity';
import { CommentVote, uniqueCommentVoteName } from '../comment-vote.entity';
import {
  CreateCommentVoteDto,
  UpdateCommentVoteDto,
} from '../comment-votes.dto';
import { CommentVoteRepository } from '../comment-votes.repository';

@Injectable()
export class CommentVoteService {
  constructor(
    @InjectRepository(CommentVoteRepository)
    private readonly commentVoteRepository: CommentVoteRepository,
  ) {}

  async findOne(id: CommentVote['id']) {
    return this.commentVoteRepository.findOne(id);
  }

  async save(
    createcommentVoteDto: CreateCommentVoteDto,
    userId: User['id'],
    commentId: Comment['id'],
  ) {
    try {
      return await this.commentVoteRepository.save({
        ...createcommentVoteDto,
        userId,
        commentId,
      });
    } catch (error) {
      if (error && error.constraint === uniqueCommentVoteName) {
        throw new BadRequestException('Pair userId/commentId duplicate');
      }
    }
  }

  async update(
    id: CommentVote['id'],
    updateCommentVoteDto: UpdateCommentVoteDto,
  ) {
    const commentVote = await this.commentVoteRepository.findOne(id);
    if (commentVote?.voteType !== updateCommentVoteDto?.voteType) {
      const voteTime = new Date();
      return this.commentVoteRepository.save({
        ...commentVote,
        ...updateCommentVoteDto,
        voteTime,
      });
    }
    return commentVote;
  }

  async remove(id: CommentVote['id']) {
    const commentVote = await this.commentVoteRepository.findOne(id);
    return this.commentVoteRepository.remove(commentVote);
  }

  async findManyByUserId(userId: User['id']) {
    return this.commentVoteRepository.find({
      where: {
        userId: userId,
      },
    });
  }

  async findManyByCommentId(commentId: User['id']) {
    return this.commentVoteRepository.find({
      where: {
        commentId: commentId,
      },
    });
  }
}
