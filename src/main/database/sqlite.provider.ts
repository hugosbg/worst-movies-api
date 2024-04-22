import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule } from '@nestjs/common';
import { connection } from './sqlite.db';
import { MovieSeed } from './movie.seed';

export class SQLiteProvider {
  static register(): DynamicModule {
    return TypeOrmModule.forRootAsync({
      useFactory: () => connection.options,
      dataSourceFactory: async () => {
        const dataSource = await connection.initialize();
        await MovieSeed.run(dataSource);
        return dataSource;
      },
    });
  }
}
