import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './posts.controller';
import { PostRepository } from './posts.repository';
import { PostResolver } from './posts.resolver';
import { PostService } from './services/posts.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  controllers: [PostController],
  providers: [PostService, PostResolver],
  exports: [PostService],
})
export class PostModule {}
