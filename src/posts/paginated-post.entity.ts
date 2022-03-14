import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/pagging/paginated';
import { Post } from './post.entity';

@ObjectType()
export class PaginatedPost extends Paginated(Post) {}
