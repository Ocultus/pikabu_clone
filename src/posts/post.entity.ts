import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/comment.entity';
import { BaseEntity } from 'src/common/base-entity.dto';
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
  postTags?: PostTag[];

  @Field(() => [PostVote], { nullable: true })
  @OneToMany(() => PostVote, (postVote) => postVote.post, {
    cascade: true,
  })
  postVotes?: PostVote[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.post, {
    cascade: true,
  })
  comments?: Comment[];
}
