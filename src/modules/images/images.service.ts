import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

/** Enum */
import { EImageError } from 'src/common/enums/image.error';

/** DTO */
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

/** Interface */
import { ICreateImage } from 'src/common/interfaces/create.image';
import { IFindAllImage } from 'src/common/interfaces/findAll.image';
import { IFindOneImage } from 'src/common/interfaces/findOne.image';
import { IUpdateImage } from 'src/common/interfaces/update.image';
import { IRemoveImage } from 'src/common/interfaces/remove.image';

/** Entity */
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private imagesRepository: Repository<Image>,
  ) {}

  private logger = new Logger(ImagesService.name);

  async create(createImageDto: CreateImageDto): Promise<ICreateImage> {
    try {
      const data = await this.imagesRepository.save(createImageDto);

      return { data };
    } catch (err) {
      this.logger.error(`Create image error: ${err}`);
      return { error: EImageError.UNKNOWN };
    }
  }

  async findAll(): Promise<IFindAllImage> {
    try {
      const data = await this.imagesRepository.find();
      return { data };
    } catch (err) {
      this.logger.error(`Find all images error: ${err}`);
      return { error: EImageError.UNKNOWN };
    }
  }

  async findOne(id: number): Promise<IFindOneImage> {
    try {
      if (isNaN(id)) {
        return { error: EImageError.WRONG_ID };
      }
      const data = await this.imagesRepository.findOneBy({ id });
      return { data };
    } catch (err) {
      this.logger.error(`Find image by id error: ${err}`);
      return { error: EImageError.UNKNOWN };
    }
  }

  async update(
    id: number,
    updateImageDto: UpdateImageDto,
  ): Promise<IUpdateImage> {
    try {
      if (isNaN(id)) {
        return { error: EImageError.WRONG_ID };
      }
      const data = await this.imagesRepository.save({
        id,
        ...updateImageDto,
      });
      return { data };
    } catch (err) {
      this.logger.error(`Update image by id error: ${err}`);
      return { error: EImageError.UNKNOWN };
    }
  }

  async remove(id: number): Promise<IRemoveImage> {
    try {
      if (isNaN(id)) {
        return { error: EImageError.WRONG_ID };
      }
      await this.imagesRepository.delete(id);
    } catch (err) {
      this.logger.error(`Remove image by id error: ${err}`);
      return { error: EImageError.UNKNOWN };
    }
  }
}
