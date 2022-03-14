import {
  Body,
  Controller,
  Delete,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PostVote } from './post-vote.entity';
import { UpdatePostVoteDto } from './post-votes.dto';
import { PostVoteService } from './services/post-votes.service';

@Controller('post-votes')
@UseGuards(JwtAuthGuard)
export class PostVoteController {
  constructor(private readonly postVoteService: PostVoteService) {}

  @Put(':id')
  async update(
    @Param('id') id: PostVote['id'],
    @Body() updatePostVoteDto: UpdatePostVoteDto,
  ): Promise<PostVote> {
    return this.postVoteService.update(id, updatePostVoteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: PostVote['id']): Promise<PostVote> {
    return this.postVoteService.remove(id);
  }
}
