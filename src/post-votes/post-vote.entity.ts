import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

export enum VoteType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

registerEnumType(VoteType, {
  name: 'VoteType',
});

const tableName = 'post-votes';
export const uniquePostVoteName = 'UNIQUE_VOTES';
@Entity({
  name: tableName,
})
@Unique(uniquePostVoteName, ['userId', 'postId'])
@ObjectType()
export class PostVote {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column({ name: 'userId', type: 'uuid' })
  userId: string;

  @Field()
  @Column({ name: 'postId', type: 'uuid' })
  postId: string;

  @Field(() => VoteType)
  @Column({ type: 'enum', enum: VoteType })
  voteType: VoteType;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  voteTime: Date;

  //Relations
  @ManyToOne(() => Post, (post) => post.postVotes, {
    onDelete: 'CASCADE',
  })
  post?: Post;

  @ManyToOne(() => User, (user) => user.postVotes, {
    onDelete: 'CASCADE',
  })
  user?: User;
}
