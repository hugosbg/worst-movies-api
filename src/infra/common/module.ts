import { Module } from '@nestjs/common';
import { MoviesController } from '@infra/controllers/movies.controller';
import { MovieUseCaseModule } from './usecase';

@Module({
  imports: [MovieUseCaseModule.register()],
  controllers: [MoviesController],
})
export class MovieModule {}
