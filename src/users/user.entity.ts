import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/post.entity';
import { PostVote } from 'src/post-votes/post-vote.entity';

const tableName = 'users';
@Entity({
  name: tableName,
})
@ObjectType()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ type: 'varchar', unique: true })
  email: string;

  //Relations
  @Field(() => [Post], { nullable: true })
  @OneToMany(() => Post, (post) => post.user, {
    cascade: true,
  })
  posts?: Post[];

  @Field(() => [PostVote], { nullable: true })
  @OneToMany(() => PostVote, (postVote) => postVote.user, {
    cascade: true,
  })
  postVotes?: PostVote[];
}
