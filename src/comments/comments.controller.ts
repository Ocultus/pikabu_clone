import {
  Put,
  Param,
  Body,
  Delete,
  Controller,
  UseGuards,
  Post,
} from '@nestjs/common';
import { UpdateCommentDto } from './comments.dto';
import { CommentService } from './services/comments.service';
import { Comment } from './comment.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CommentVoteService } from 'src/comment-votes/services/comment-votes.service';
import { CreateCommentVoteDto } from 'src/comment-votes/comment-votes.dto';
import { User } from 'src/users/users.decorator';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly commentVoteService: CommentVoteService,
  ) {}
  @Put(':id')
  async update(
    @Param('id') id: Comment['id'],
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: Comment['id']): Promise<Comment> {
    return this.commentService.remove(id);
  }

  @Post(':id/votes')
  async saveVote(
    @Body() createCommentVoteDto: CreateCommentVoteDto,
    @Param('id') commentId,
    @User('id') userId,
  ) {
    return this.commentVoteService.save(
      createCommentVoteDto,
      userId,
      commentId,
    );
  }
}
