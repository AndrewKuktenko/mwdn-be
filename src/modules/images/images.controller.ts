import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';

/** Service */
import { ImagesService } from './images.service';

/** DTO */
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  async create(@Body() createImageDto: CreateImageDto) {
    const data = await this.imagesService.create(createImageDto);
    if (data?.error) throw new BadRequestException(data.error);
    else return data;
  }

  @Get()
  async findAll() {
    const data = await this.imagesService.findAll();
    if (data?.error) throw new BadRequestException(data.error);
    else return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.imagesService.findOne(+id);
    if (data?.error) throw new BadRequestException(data.error);
    else return data;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
  ) {
    const data = await this.imagesService.update(+id, updateImageDto);
    if (data?.error) throw new BadRequestException(data.error);
    else return data;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data = await this.imagesService.remove(+id);
    if (data?.error) throw new BadRequestException(data.error);
    else return data;
  }
}
