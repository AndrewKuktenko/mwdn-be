import { EImageError } from 'src/common/enums/image.error';
import { Image } from 'src/modules/images/entities/image.entity';

export interface IFindAllImage {
  data?: Image[];
  error?: EImageError;
}
