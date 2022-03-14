import { Field, ObjectType } from '@nestjs/graphql';
import { BaseVoteEntity } from 'src/common/base/base-vote.entity';
import { Post } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

const tableName = 'post-votes';
export const uniquePostVoteName = 'UNIQUE_VOTES';
@Entity({
  name: tableName,
})
@Unique(uniquePostVoteName, ['userId', 'postId'])
@ObjectType()
export class PostVote extends BaseVoteEntity {
  @Field()
  @Column({ name: 'postId', type: 'uuid' })
  postId: string;

  //Relations
  @ManyToOne(() => Post, (post) => post.votes, {
    onDelete: 'CASCADE',
  })
  post?: Post;

  @ManyToOne(() => User, (user) => user.postVotes, {
    onDelete: 'CASCADE',
  })
  user?: User;
}
