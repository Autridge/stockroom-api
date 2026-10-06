import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SkuNormalizerPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body' && value?.sku) {
      return { ...value, sku: value.sku.toUpperCase().trim() };
    }
    return value;
  }
}
