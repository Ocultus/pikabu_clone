import { Field, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comments/comment.entity';
import { BaseVoteEntity } from 'src/common/base/base-vote.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, Unique } from 'typeorm';

const tableName = 'comment-votes';
export const uniqueCommentVoteName = 'UNIQUE_COMMENT_VOTES';
@Entity({
  name: tableName,
})
@Unique(uniqueCommentVoteName, ['userId', 'commentId'])
@ObjectType()
export class CommentVote extends BaseVoteEntity {
  @Field()
  @Column({ name: 'commentId', type: 'uuid' })
  commentId: string;

  //Relations
  @ManyToOne(() => Comment, (comment) => comment.commentVotes, {
    onDelete: 'CASCADE',
  })
  comment?: Comment;

  @ManyToOne(() => User, (user) => user.commentVotes, {
    onDelete: 'CASCADE',
  })
  user?: User;
}
