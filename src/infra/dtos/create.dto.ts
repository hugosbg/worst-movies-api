import { Transform, plainToClass } from 'class-transformer';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { Movie, Winner } from '@domain/entities/movie';

export class CreateDto implements Movie {
  @Transform(({ value }) => Number(value))
  @IsNotEmpty()
  @IsInt()
  readonly year: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly studios: string;

  @IsNotEmpty()
  @IsString()
  readonly producers: string;

  @Transform(({ value }) => value || null)
  readonly winner: Winner;

  static parse(row: Movie) {
    return plainToClass(CreateDto, row);
  }
}
