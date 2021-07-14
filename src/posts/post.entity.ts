import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/base-entity.dto';
import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

const tableName = 'posts';
@Entity({
  name: tableName,
})
@ObjectType()
export class Post extends BaseEntity {
  @Field((type) => ID)
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
}
