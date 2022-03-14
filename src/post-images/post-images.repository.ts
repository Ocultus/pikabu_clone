import { EntityRepository, Repository } from 'typeorm';
import { PostImage } from './post-image.entity';

@EntityRepository(PostImage)
export class PostImageRepository extends Repository<PostImage> {}
