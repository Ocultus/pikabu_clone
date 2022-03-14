import { ObjectType } from '@nestjs/graphql';
import { Paginated } from 'src/common/pagging/paginated';
import { Comment } from '../comments/comment.entity';

@ObjectType()
export class PaginatedComment extends Paginated(Comment) {}
