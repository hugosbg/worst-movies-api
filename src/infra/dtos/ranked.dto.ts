import { ApiProperty } from '@nestjs/swagger';
import { Type, plainToClass } from 'class-transformer';
import { Ranked, Producer } from '@domain/entities/ranked';

class RankedProducerDto implements Producer {
  @ApiProperty()
  readonly producer: string;

  @ApiProperty()
  readonly interval: number;

  @ApiProperty()
  readonly previousWin: number;

  @ApiProperty()
  readonly followingWin: number;
}

export class RankedDto implements Ranked {
  @ApiProperty({ isArray: true, type: RankedProducerDto })
  @Type(() => RankedProducerDto)
  readonly min: RankedProducerDto[];

  @ApiProperty({ isArray: true, type: RankedProducerDto })
  @Type(() => RankedProducerDto)
  readonly max: RankedProducerDto[];

  static parse(data: Ranked) {
    return plainToClass(RankedDto, data);
  }
}
