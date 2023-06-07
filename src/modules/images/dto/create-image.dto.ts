import { IsNumber, IsString } from 'class-validator';

export class CreateImageDto {
  @IsNumber()
  albumId: number;

  @IsString()
  title: string;

  @IsString()
  path: string;
}
