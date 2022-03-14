import { ExecutionContext, mixin, NestInterceptor } from '@nestjs/common';
import { Optional } from '@nestjs/common/decorators/core/optional.decorator';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

interface IField {
  name: string;
  options?: any;
}

export function GraphqlFileFieldsInterceptor(
  uploadFields: IField[],
  localOptions?: any,
) {
  class MixinInterceptor implements NestInterceptor {
    options: any = {};
    constructor(@Optional() options: any = {}) {
      this.options = { ...options, ...localOptions };
    }

    async intercept(
      context: ExecutionContext,
      call$: Observable<any>,
    ): Promise<Observable<any>> {
      const ctx = GqlExecutionContext.create(context);
      const args = ctx.getArgs();

      let storeFilesResult = await Promise.all(
        uploadFields.map(async (uploadField) => {
          const file = args[uploadField.name];
          const address = await storeFile(file, {
            ...uploadField.options,
            ...this.options,
          });
          args[uploadField.name] = address;
          return address;
        }),
      );

      return call$;
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor;
}

const dir = './files';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

export const storeFile = async (file, options): Promise<any> => {
  // options is not doing anything right now
  const { stream } = await file;
  const filename = uuid();

  const fileAddress = path.join(dir, filename + '.jpg');
  return new Promise((resolve, reject) =>
    stream
      .on('error', (error) => {
        if (stream.truncated)
          // Delete the truncated file
          fs.unlinkSync(fileAddress);
        reject(error);
      })
      .pipe(fs.createWriteStream(fileAddress))
      .on('error', (error) => reject(error))
      .on('finish', () => resolve(fileAddress)),
  );
};
