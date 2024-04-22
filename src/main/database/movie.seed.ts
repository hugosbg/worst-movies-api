import * as fs from 'node:fs';
import { DataSource } from 'typeorm';
import { parse } from '@fast-csv/parse';
import { validateOrReject, ValidationError } from 'class-validator';
import { CreateDto } from '@infra/dtos/create.dto';
import { Movie } from '@infra/entities/movie.entity';

export class MovieSeed {
  static async run(dataSource: DataSource) {
    return new Promise((resolve, reject) => {
      const entities: CreateDto[] = [];
      const repository = dataSource.getRepository(Movie);
      const headers = ['year', 'title', 'studios', 'producers', 'winner'];
      const file = process.cwd() + '/storage/movielist.csv';
      fs.createReadStream(file, { encoding: 'utf-8' })
        .pipe(
          parse({
            headers,
            delimiter: ';',
            skipRows: 1,
            trim: true,
            ignoreEmpty: true,
          }),
        )
        .on('error', (error) => reject(error))
        .on('data', (row) => entities.push(CreateDto.parse(row)))
        .on('end', () => {
          Promise.all(entities.map((item) => validateOrReject(item)))
            .catch((error: ValidationError) => {
              reject(new Error(error.toString()));
            })
            .then(() =>
              repository
                .save(entities, { chunk: 100 })
                .then(resolve)
                .catch(reject),
            );
        });
    });
  }
}
