import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/post.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

const tableName = 'post-tags';
export const uniquePostTagName = 'UNIQUE_TAGS';
@Entity({
  name: tableName,
})
@Unique(uniquePostTagName, ['name', 'postId'])
@ObjectType()
export class PostTag {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ name: 'name', type: 'varchar' })
  name: string;

  @Field()
  @Column({ name: 'postId', type: 'uuid' })
  postId: string;

  //Relations
  @ManyToOne(() => Post, (post) => post.postTags, {
    onDelete: 'CASCADE',
  })
  post?: Post;
}
