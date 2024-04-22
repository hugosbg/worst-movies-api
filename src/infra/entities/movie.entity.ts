import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovieWithId, Winner } from '@domain/entities/movie';

@Entity()
export class Movie implements MovieWithId {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'integer' })
  year: number;

  @Column()
  title: string;

  @Column()
  studios: string;

  @Column()
  producers: string;

  @Column({ enum: ['yes', 'no'], nullable: true })
  winner: Winner;
}
