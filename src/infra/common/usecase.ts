import { DynamicModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRankedUsecase } from '@domain/usecase/list-ranked';
import { MovieRepository } from '@infra/repositories/movie.repo';
import { Movie } from '@infra/entities/movie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieRepository],
})
export class MovieUseCaseModule {
  static register(): DynamicModule {
    return {
      module: MovieUseCaseModule,
      providers: [
        {
          provide: ListRankedUsecase,
          inject: [MovieRepository],
          useFactory: (movieRepository: MovieRepository) =>
            new ListRankedUsecase(movieRepository),
        },
      ],
      exports: [ListRankedUsecase],
    };
  }
}
