import {
  Body,
  Controller,
  Delete,
  Param,
  Post as PostDecorator,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/users/users.decorator';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { PostService } from './services/posts.service';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @PostDecorator()
  async save(
    @Body() createPostDto: CreatePostDto,
    @User('id') userId: string,
  ): Promise<Post> {
    return this.postService.save(createPostDto, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: Post['id'],
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: Post['id']): Promise<Post> {
    return this.postService.remove(id);
  }
}
