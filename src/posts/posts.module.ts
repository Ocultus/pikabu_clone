import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTagRepository } from 'src/post-tags/post-tags.repository';
import { PostTagService } from 'src/post-tags/services/post-tags.service';
import { PostController } from './posts.controller';
import { PostRepository } from './posts.repository';
import { PostResolver } from './posts.resolver';
import { PostService } from './services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository, PostTagRepository])],
  controllers: [PostController],
  providers: [PostService, PostResolver, PostTagService],
  exports: [PostService],
})
export class PostModule {}
