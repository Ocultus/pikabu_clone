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
import { CreateCommentDto } from 'src/comments/comments.dto';
import { CommentService } from 'src/comments/services/comments.service';
import { PostTag } from 'src/post-tags/post-tag.entity';
import { CreatePostTagDto } from 'src/post-tags/post-tags.dto';
import { PostTagService } from 'src/post-tags/services/post-tags.service';
import { PostVote } from 'src/post-votes/post-vote.entity';
import { CreatePostVoteDto } from 'src/post-votes/post-votes.dto';
import { PostVoteService } from 'src/post-votes/services/post-votes.service';
import { User } from 'src/users/users.decorator';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { PostService } from './services/posts.service';
import { Comment } from '../comments/comment.entity';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postTagService: PostTagService,
    private readonly postVoteService: PostVoteService,
    private readonly commentService: CommentService,
  ) {}

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

  @PostDecorator(':id/tags')
  async savePostTag(
    @Body() createPostTagDto: CreatePostTagDto,
    @Param('id') postId: Post['id'],
  ): Promise<PostTag> {
    return this.postTagService.save(createPostTagDto, postId);
  }

  @PostDecorator(':id/votes')
  async savePostVote(
    @Body() createPostVoteDto: CreatePostVoteDto,
    @Param('id') postId: Post['id'],
    @User('id') userId: string,
  ): Promise<PostVote> {
    return this.postVoteService.save(createPostVoteDto, userId, postId);
  }

  @PostDecorator(':id/comments')
  async saveComment(
    @Body() createCommentDto: CreateCommentDto,
    @Param('id') postId: Post['id'],
    @User('id') userId: string,
  ): Promise<Comment> {
    return this.commentService.save(createCommentDto, userId, postId);
  }
}
