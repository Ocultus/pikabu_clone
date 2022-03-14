import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/comment.entity';
import { BaseEntity } from 'src/common/base/base-date.entity';
import { PostImage } from 'src/post-images/post-image.entity';
import { PostTag } from 'src/post-tags/post-tag.entity';
import { PostVote } from 'src/post-votes/post-vote.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

const tableName = 'posts';
@Entity({
  name: tableName,
})
@ObjectType()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'uuid' })
  userId: string;

  @Field()
  @Column({ type: 'text' })
  title: string;

  @Field()
  @Column({ type: 'varchar' })
  description: string;

  //Relations
  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: 'CASCADE',
  })
  user?: User;

  @Field(() => [PostTag], { nullable: true })
  @OneToMany(() => PostTag, (postTag) => postTag.post, {
    cascade: true,
  })
  tags?: PostTag[];

  @Field(() => [PostVote], { nullable: true })
  @OneToMany(() => PostVote, (postVote) => postVote.post, {
    cascade: true,
  })
  votes?: PostVote[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments?: Comment[];

  @Field(() => [PostImage], { nullable: true })
  @OneToMany(() => PostImage, (postImage) => postImage.post, {
    cascade: true,
  })
  images?: PostImage;
}
