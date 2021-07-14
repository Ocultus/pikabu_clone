import { Module } from '@nestjs/common';
import { UserModule } from './users/users.module';
import { PostModule } from './posts/posts.module';
import { CommentModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PostTagModule } from './post-tags/post-tags.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PostModule,
    TypeOrmModule.forRoot(),
    UserModule,
    CommentModule,
    PostTagModule,
  ],
})
export class AppModule {}
