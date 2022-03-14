import { Field, ObjectType } from '@nestjs/graphql';
import { BaseImageEntity } from 'src/common/base/base-image.entity';
import { Post } from 'src/posts/post.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

const tableName = 'post-images';
@Entity({
  name: tableName,
})
@ObjectType()
export class PostImage extends BaseImageEntity {
  @Field()
  @Column({ type: 'uuid' })
  postId: string;

  //Relations
  @ManyToOne(() => Post, (post) => post.images)
  post?: Post;
}
