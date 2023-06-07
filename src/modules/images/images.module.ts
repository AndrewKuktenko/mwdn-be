import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

/** Service */
import { ImagesService } from './images.service';

/** Controller */
import { ImagesController } from './images.controller';

/** Entity */
import { Image } from './entities/image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
