import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostTagController } from './post-tags.controller';
import { PostTagRepository } from './post-tags.repository';
import { PostTagResolver } from './post-tags.resolver';
import { PostTagService } from './services/post-tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([PostTagRepository])],
  controllers: [PostTagController],
  providers: [PostTagService, PostTagResolver],
  exports: [PostTagService],
})
export class PostTagModule {}
