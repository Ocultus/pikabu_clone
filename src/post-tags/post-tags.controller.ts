import {
  Controller,
  UseGuards,
  Put,
  Param,
  Body,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Post } from 'src/posts/post.entity';
import { PostTag } from './post-tag.entity';
import { UpdatePostTagDto } from './post-tags.dto';
import { PostTagService } from './services/post-tags.service';

@Controller('post-tags')
@UseGuards(JwtAuthGuard)
export class PostTagController {
  constructor(private readonly postTagService: PostTagService) {}

  @Put(':id')
  async update(
    @Param('id') id: Post['id'],
    @Body() updatePostTagDto: UpdatePostTagDto,
  ): Promise<PostTag> {
    return this.postTagService.update(id, updatePostTagDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: PostTag['id']): Promise<PostTag> {
    return this.postTagService.remove(id);
  }
}
