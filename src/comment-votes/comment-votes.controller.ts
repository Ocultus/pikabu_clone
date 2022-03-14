import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CommentVote } from './comment-vote.entity';
import { UpdateCommentVoteDto } from './comment-votes.dto';
import { CommentVoteService } from './services/comment-votes.service';

@Controller('comment-votes')
@UseGuards(JwtAuthGuard)
export class CommentVoteController {
  constructor(private readonly commentVoteService: CommentVoteService) {}

  @Put(':id')
  async update(
    @Param('id') id: CommentVote['id'],
    @Body() updateCommentVoteDto: UpdateCommentVoteDto,
  ): Promise<CommentVote> {
    return this.commentVoteService.update(id, updateCommentVoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: CommentVote['id']): Promise<CommentVote> {
    return this.commentVoteService.remove(id);
  }
}
