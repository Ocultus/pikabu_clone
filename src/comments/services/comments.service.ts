import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CommentRepository } from '../comments.repository';
import { Comment } from '../comment.entity';
import { CreateCommentDto, UpdateCommentDto } from '../comments.dto';
import { Post } from 'src/posts/post.entity';
import { paginate } from 'src/common/pagging/paginate';
import { PaginationArgs } from 'src/common/pagging/pagination-args';

export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
  ) {}

  async findOne(id: Comment['id']) {
    return this.commentRepository.findOne(id);
  }

  async save(
    createCommentDto: CreateCommentDto,
    userId: User['id'],
    postId: Post['id'],
  ) {
    return this.commentRepository.save({ ...createCommentDto, userId, postId });
  }

  async update(id: Comment['id'], updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.findOne(id);
    return this.commentRepository.save({ ...comment, ...updateCommentDto });
  }

  async remove(id: Comment['id']): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);
    return this.commentRepository.remove(comment);
  }

  async findManyByPostId(postId: Post['id']): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        postId: postId,
      },
    });
  }

  async findManyByUserId(userId: User['id']): Promise<Comment[]> {
    return this.commentRepository.find({
      where: {
        userId: userId,
      },
    });
  }

  async getPaginatedPosts(paginationArgs: PaginationArgs) {
    const query = this.commentRepository.createQueryBuilder().select();
    return paginate(query, paginationArgs);
  }

  async getCommentsByLikeCount(limit = 10) {
    limit = limit > 0 ? limit : 10;
    const comments = this.commentRepository
      .createQueryBuilder('comments')
      .leftJoin('comments.commentVotes', 'votes')
      .groupBy('comments')
      .orderBy(
        `COUNT(votes.voteType) FILTER (WHERE votes.voteType = 'like')`,
        'DESC',
      )
      .limit(limit)
      .getMany();

    return comments;
  }

  async getCommentsByCreateAt(limit = 10): Promise<Comment[]> {
    limit = limit > 0 ? limit : 10;
    const comments = await this.commentRepository
      .createQueryBuilder('comments')
      .orderBy('comments.createAt')
      .limit(limit)
      .getMany();
    return comments;
  }
}
