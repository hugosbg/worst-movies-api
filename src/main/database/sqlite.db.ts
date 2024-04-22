import { DataSource } from 'typeorm';
import { Movie } from '@infra/entities/movie.entity';

export const connection = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  entities: [Movie],
  synchronize: true,
});
