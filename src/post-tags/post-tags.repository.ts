import { EntityRepository, Repository } from 'typeorm';
import { PostTag } from './post-tag.entity';

@EntityRepository(PostTag)
export class PostTagRepository extends Repository<PostTag> {}
