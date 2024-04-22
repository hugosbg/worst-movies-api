import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IRepository, QueryResult } from '@domain/contracts/repository';
import { Movie } from '@infra/entities/movie.entity';
import { queryMax, queryMin } from './queries/ranked-producers';

@Injectable()
export class MovieRepository implements IRepository {
  constructor(
    @InjectRepository(Movie) private readonly movie: Repository<Movie>,
  ) {}

  async getMaxInterval() {
    return this.movie.query(queryMax) as Promise<QueryResult[]>;
  }

  async getMinInterval() {
    return this.movie.query(queryMin) as Promise<QueryResult[]>;
  }
}
