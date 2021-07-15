import {
  Put,
  Param,
  Body,
  Delete,
  Controller,
  UseGuards,
} from '@nestjs/common';
import { UpdateCommentDto } from './comments.dto';
import { CommentService } from './services/comments.service';
import { Comment } from './comment.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
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
}
