import { Module } from '@nestjs/common';
import { SQLiteProvider } from '@main/database/sqlite.provider';
import { MovieModule } from '@infra/common/module';

@Module({
  imports: [SQLiteProvider.register(), MovieModule],
})
export class AppModule {}
