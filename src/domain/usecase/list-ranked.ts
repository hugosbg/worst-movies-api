import { Ranked, Producer } from '@domain/entities/ranked';
import { IRepository, QueryResult } from '@domain/contracts/repository';

export class ListRankedUsecase {
  constructor(private readonly repository: IRepository) {}

  async execute(): Promise<Ranked> {
    const [minInterval, maxInterval] = await Promise.all([
      this.repository.getMinInterval(),
      this.repository.getMaxInterval(),
    ]);
    return {
      min: this.parse(minInterval),
      max: this.parse(maxInterval),
    };
  }

  private parse(result: QueryResult[]): Producer[] {
    return result.map(({ years, interval, producer }): Producer => {
      const [previousWin, followingWin] = years.split(',').map(Number);
      return {
        producer,
        interval,
        previousWin,
        followingWin,
      };
    });
  }
}
