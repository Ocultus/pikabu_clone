import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.dto';
import { PostTag } from 'src/post-tags/post-tag.entity';
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
}
