import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CommentVote } from 'src/comment-votes/comment-vote.entity';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

const tableName = 'comments';
@Entity({
  name: tableName,
})
@ObjectType()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'text' })
  @Field()
  text: string;

  @Column({ type: 'uuid' })
  @Field()
  userId: string;

  @Column({ type: 'uuid' })
  @Field()
  postId: string;

  //Relations
  @ManyToOne(() => User, (user) => user.comments, {
    onDelete: 'CASCADE',
  })
  user?: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    onDelete: 'CASCADE',
  })
  post?: Post;

  @Field(() => [CommentVote], { nullable: true })
  @OneToMany(() => CommentVote, (commentVote) => commentVote.comment, {
    cascade: true,
  })
  commentVotes?: CommentVote[];
}
