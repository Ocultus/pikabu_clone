import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn, Column } from 'typeorm';

export enum VoteType {
  LIKE = 'like',
  DISLIKE = 'dislike',
}

registerEnumType(VoteType, {
  name: 'VoteType',
});

@ObjectType()
export class BaseVoteEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ name: 'userId', type: 'uuid' })
  userId: string;

  @Field(() => VoteType)
  @Column({ type: 'enum', enum: VoteType })
  voteType: VoteType;

  @Field()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  voteTime: Date;
}
