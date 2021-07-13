import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { PostModule } from './posts/posts.module';
import { CommentModule } from './comments/comments.module';
import { ContentBookmarkModule } from './content-bookmarks/content-bookmarks.module';
import { PostTagModule } from './post-tags/post-tags.module';
import { ContentVoteModule } from './content-votes/content-votes.module';
import { ImageModule } from './images/images.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    PostModule,
    CommentModule,
    ContentBookmarkModule,
    PostTagModule,
    ContentVoteModule,
    ImageModule,
  ],
})
export class AppModule {}
