import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { S3 } from 'aws-sdk';
import { AWS_BUCKET_NAME } from 'src/common/constants';
import { Post } from 'src/posts/post.entity';
import { PostImageRepository } from '../post-images.repository';
import { v4 as uuid } from 'uuid';

export class PostImageService {
  constructor(private readonly repository: PostImageRepository) {}
  async save(fileBuffer: Buffer, fileName: string, postId: Post['id']) {
    if (!fileName || !fileBuffer) {
      throw new BadRequestException('File not attach');
    }
    const s3Response = await this.uploadFile(fileBuffer, fileName);
    return await this.repository.save({
      ...s3Response,
      postId,
    });
  }

  async uploadFile(
    fileBuffer: Buffer,
    filename: string,
  ): Promise<S3ResponseDto> {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: AWS_BUCKET_NAME,
          Body: fileBuffer,
          Key: `${uuid()}-${filename}`,
        })
        .promise();
      return { key: uploadResult.Key, url: uploadResult.Location };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
