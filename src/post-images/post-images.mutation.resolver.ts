import { Args, Mutation } from '@nestjs/graphql';
import { PostImageService } from './services/post-images.service';
import { GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

export class PostImageMutation {
  constructor(private readonly postImageService: PostImageService) {}

  @Mutation(() => Boolean)
  async createPostImage(
    @Args({ name: 'image', type: () => GraphQLUpload })
    { createReadStream, filename },
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/${filename}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    ); 
  }
}
