import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { CommentRepository } from '../comments.repository';
import { Comment } from '../comment.entity';
import { CreateCommentDto, UpdateCommentDto } from '../comments.dto';
import { Post } from 'src/posts/post.entity';

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
}
