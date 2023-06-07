import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  albumId: number;

  @Column('text')
  title: string;

  @Column('text')
  path: string;
}
